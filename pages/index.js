import Layout from '../src/components/Layout'
import Hero from '../src/components/Hero'
import Slider from '../src/components/Slider'
import Tutorial from '../src/components/Tutorial'
import axios from 'axios'

export default function Home(props) {
  return (
    <Layout>
      <Hero />
      <Slider data={props.data} />
      <Tutorial />
    </Layout>
  )
}


export async function getServerSideProps() {
  const rawData = await axios.get('http://judasz.ddns.net:8002/')
  const data = rawData.data

  return {
    props: {
      data
    }
  }
}