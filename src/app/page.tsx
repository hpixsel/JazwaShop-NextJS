'use client'

import Hero from '@components/Hero'
import Slider from '@components/Slider'
import Tutorial from '@components/Tutorial'
import { Suspense, useState, useEffect } from 'react'
import { getAllAuctions } from '@lib/auctions'

export default function Home() {
  const [allAuctions, setAllAuctions] = useState([])

  useEffect(() => {
    async function getAuctions () {
      const res = await getAllAuctions()
      setAllAuctions(res)
    }
    getAuctions()
  }, [])


  return (
    <>
        <Hero />
        <Suspense fallback={<div>Loading...</div>}>
          {allAuctions && <Slider data={allAuctions} />}
        </Suspense>
        <Tutorial />
    </>
  )
}