import { useState, useCallback } from 'react'
import { Upload, Download, FileText, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface ImportPreview {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  tags?: string[]
}

export default function ContactImport() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [preview, setPreview] = useState<ImportPreview[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [importResults, setImportResults] = useState<{
    successful: number
    failed: number
    duplicates: number
  } | null>(null)
  const router = useRouter()

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (!uploadedFile) return

    if (uploadedFile.type !== 'text/csv' && !uploadedFile.name.endsWith('.csv')) {
      setErrors(['Please upload a CSV file'])
      return
    }

    setFile(uploadedFile)
    setErrors([])
    parseCSV(uploadedFile)
  }, [])

  const parseCSV = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split('\n').filter(line => line.trim())
      
      if (lines.length < 2) {
        setErrors(['CSV file must contain at least a header row and one data row'])
        return
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
      const emailIndex = headers.findIndex(h => h.includes('email'))
      
      if (emailIndex === -1) {
        setErrors(['CSV file must contain an email column'])
        return
      }

      const firstNameIndex = headers.findIndex(h => h.includes('first') && h.includes('name'))
      const lastNameIndex = headers.findIndex(h => h.includes('last') && h.includes('name'))
      const phoneIndex = headers.findIndex(h => h.includes('phone'))
      const tagsIndex = headers.findIndex(h => h.includes('tag'))

      const parsed: ImportPreview[] = []
      const parseErrors: string[] = []

      lines.slice(1).forEach((line, index) => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
        const email = values[emailIndex]?.toLowerCase()

        if (!email || !email.includes('@')) {
          parseErrors.push(`Row ${index + 2}: Invalid email address`)
          return
        }

        const contact: ImportPreview = {
          email,
          firstName: firstNameIndex >= 0 ? values[firstNameIndex] : undefined,
          lastName: lastNameIndex >= 0 ? values[lastNameIndex] : undefined,
          phone: phoneIndex >= 0 ? values[phoneIndex] : undefined,
          tags: tagsIndex >= 0 && values[tagsIndex] 
            ? values[tagsIndex].split(';').map(t => t.trim()).filter(t => t)
            : undefined
        }

        parsed.push(contact)
      })

      setPreview(parsed.slice(0, 10)) // Show first 10 for preview
      setErrors(parseErrors.slice(0, 5)) // Show first 5 errors
    }

    reader.readAsText(file)
  }

  const handleImport = async () => {
    if (!file || preview.length === 0) return

    setIsProcessing(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/contacts/import', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const results = await response.json()
        setImportResults(results)
      } else {
        const error = await response.json()
        setErrors([error.error || 'Import failed'])
      }
    } catch (error) {
      setErrors(['Import failed. Please try again.'])
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadTemplate = () => {
    const csvContent = 'email,first_name,last_name,phone,tags\nexample@business.com,John,Doe,555-1234,customer;vip'
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'contact_import_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (importResults) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/dashboard/contacts"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Contacts
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Import Complete</h2>
            <p className="mt-2 text-gray-600">Your contacts have been imported successfully.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="stats-card text-center">
              <div className="text-2xl font-bold text-green-600">{importResults.successful}</div>
              <div className="text-sm text-gray-500">Successfully Imported</div>
            </div>
            <div className="stats-card text-center">
              <div className="text-2xl font-bold text-yellow-600">{importResults.duplicates}</div>
              <div className="text-sm text-gray-500">Duplicates Skipped</div>
            </div>
            <div className="stats-card text-center">
              <div className="text-2xl font-bold text-red-600">{importResults.failed}</div>
              <div className="text-sm text-gray-500">Failed to Import</div>
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/dashboard/contacts" className="btn-primary">
              View Contacts
            </Link>
            <button
              onClick={() => {
                setImportResults(null)
                setFile(null)
                setPreview([])
                setErrors([])
              }}
              className="btn-outline"
            >
              Import More
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/contacts"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Contacts
        </Link>
      </div>

      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Import Contacts
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Upload a CSV file to bulk import your contacts.
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-blue-900 mb-4">Import Instructions</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• Your CSV file must include an <strong>email</strong> column</p>
          <p>• Optional columns: first_name, last_name, phone, tags</p>
          <p>• For tags, separate multiple tags with semicolons (e.g., "customer;vip")</p>
          <p>• Maximum file size: 10MB</p>
          <p>• Duplicate emails will be skipped</p>
        </div>
        <button
          onClick={downloadTemplate}
          className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Template
        </button>
      </div>

      {/* File Upload */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="max-w-lg mx-auto">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    Drop your CSV file here, or{' '}
                    <span className="text-blue-600 hover:text-blue-500">browse</span>
                  </span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept=".csv"
                    className="sr-only"
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="mt-1 text-xs text-gray-500">CSV files up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Import Errors</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          {preview.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Preview</h3>
                <span className="text-sm text-gray-500">
                  Showing first 10 of {preview.length} contacts
                </span>
              </div>

              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tags
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.map((contact, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {contact.firstName || contact.lastName 
                            ? `${contact.firstName || ''} ${contact.lastName || ''}`.trim()
                            : '-'
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {contact.phone || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {contact.tags?.join(', ') || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleImport}
                  disabled={isProcessing || errors.length > 0}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Importing...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Contacts
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
