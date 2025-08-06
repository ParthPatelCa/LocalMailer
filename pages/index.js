import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import LandingPage from '../components/LandingPage'

export default function Home() {
  return <LandingPage />
}