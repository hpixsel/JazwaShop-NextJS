import Layout from '/src/components/Layout'
import Hero from '/src/components/Hero'
import Slider from '/src/components/Slider'
import Tutorial from '/src/components/Tutorial'
import axios from 'axios'
import { Suspense } from 'react'

export default function Home(props) {
  return (
    <>
      <Layout>
        <Hero />
        {/* <Suspense fallback={<div>Loading...</div>}>
          {props.data && <Slider data={props.data} />}
        </Suspense> */}
        <Tutorial />
      </Layout>
    </>
  )
}


/* export async function getServerSideProps() {
  try {
    const res = await axios.get(process.env.ENDPOINT)
    const data = res.data

    return {
      props: {
        data
      }
    }
  } catch (err) {
    console.log(err)
    return {
      props: {}
    }
  }
} */