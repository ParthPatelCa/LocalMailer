import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { authOptions } from '../lib/auth'
import DashboardLayout from '../components/DashboardLayout'
import DashboardOverview from '../components/DashboardOverview'

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center">Not authenticated</div>
  }

  return (
    <DashboardLayout>
      <DashboardOverview />
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
