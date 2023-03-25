import Layout from '../src/components/Layout'
import Hero from '../src/components/Hero'
import Slider from '../src/components/Slider'
import Tutorial from '../src/components/Tutorial'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home() {
  const {user, error, isLoading} = useUser()
  console.log(user)
  console.log(error)
  console.log(isLoading)
  
  return (
    <Layout>
      <Hero />
      <Slider />
      <Tutorial />
    </Layout>
  )
}
