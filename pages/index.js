import Layout from '../src/components/Layout'
import Hero from '../src/components/Hero'
import Slider from '../src/components/Slider'
import Tutorial from '../src/components/Tutorial'

export default function Home() {
  return (
    <div className="App">
      <Layout>
        <Hero />
        <Slider />
        <Tutorial />
      </Layout>
    </div>
  )
}
