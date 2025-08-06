import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import DashboardLayout from '../../../components/DashboardLayout'
import ContactForm from '../../../components/ContactForm'

export default function NewContactPage() {
  return (
    <DashboardLayout>
      <ContactForm />
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)
  
  if (!session) {
    return { redirect: { destination: '/auth/signin', permanent: false } }
  }

  return { props: {} }
}
