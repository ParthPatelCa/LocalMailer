import { useState, useCallback } from 'react'
import { Upload, Download, FileText, AlertCircle, CheckCircle, ArrowLeft, Users, Mail, Tag } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface ImportPreview {
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  tags?: string[]
  creatorType?: string
}

export default function ContactImport() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [preview, setPreview] = useState<ImportPreview[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [importResults, setImportResults] = useState<{
    successful: number
    failed: number
    duplicates: number
  } | null>(null)
  const router = useRouter()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      processFile(droppedFile)
    }
  }, [])

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      processFile(uploadedFile)
    }
  }, [])

  const processFile = (uploadedFile: File) => {
    if (uploadedFile.type !== 'text/csv' && !uploadedFile.name.endsWith('.csv')) {
      setErrors(['Please upload a CSV file'])
      return
    }

    setFile(uploadedFile)
    setErrors([])
    setImportResults(null)
    parseCSV(uploadedFile)
  }

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
        <h3 className="text-lg font-medium text-blue-900 mb-4">Import Your Audience</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• <strong>CSV file required:</strong> Must include an email column</p>
          <p>• <strong>Optional fields:</strong> first_name, last_name, phone, tags, source</p>
          <p>• <strong>Creator-friendly:</strong> Works with Substack, Mailchimp, ConvertKit exports</p>
          <p>• <strong>No limits:</strong> Import unlimited contacts on any plan</p>
          <p>• <strong>Clean data:</strong> We'll automatically remove duplicates and invalid emails</p>
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
      <div className="bg-white shadow-sm rounded-xl border border-gray-200">
        <div className="p-8">
          <div className="max-w-lg mx-auto">
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragOver 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className={`mx-auto h-12 w-12 transition-colors ${
                isDragOver ? 'text-primary-500' : 'text-gray-400'
              }`} />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-lg font-medium text-gray-900">
                    {isDragOver ? 'Drop your file here' : 'Drop your CSV file here, or'}{' '}
                    {!isDragOver && (
                      <span className="text-primary-600 hover:text-primary-500 underline">browse</span>
                    )}
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
                <p className="mt-2 text-sm text-gray-500">CSV files up to 10MB</p>
                
                {file && (
                  <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-green-600">
                    <FileText className="h-4 w-4" />
                    <span>{file.name}</span>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6 animate-slide-up">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary-600" />
                    Contact Preview
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Showing first 10 contacts from your file
                  </p>
                </div>
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {preview.length} contacts ready
                </div>
              </div>

              <div className="overflow-hidden shadow-sm ring-1 ring-gray-200 rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 mr-2" />
                          Tags
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {preview.slice(0, 10).map((contact, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {contact.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {contact.firstName || contact.lastName 
                            ? `${contact.firstName || ''} ${contact.lastName || ''}`.trim()
                            : <span className="text-gray-400">-</span>
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {contact.phone || <span className="text-gray-400">-</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {contact.tags?.length ? (
                            <div className="flex flex-wrap gap-1">
                              {contact.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  {tag}
                                </span>
                              ))}
                              {contact.tags.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  +{contact.tags.length - 3}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {preview.length > 10 && (
                    <p>Showing 10 of {preview.length} contacts. All will be imported.</p>
                  )}
                </div>
                <button
                  onClick={handleImport}
                  disabled={isProcessing || errors.length > 0}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Importing {preview.length} contacts...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-3" />
                      Import {preview.length} Contacts
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
