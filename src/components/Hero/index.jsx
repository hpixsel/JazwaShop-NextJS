import Image from 'next/image'
import React from 'react'
import styles from './hero.module.css'

export default function Hero() {
  return (
    <>
      <div className={styles.hero__svg}>
        <Image src="/assets/hero__svg.svg" alt="" width={337} height={321} priority/>
      </div>
      <div className={styles.hero__text}>
        <h1>Tu znajdziesz to czego szukasz</h1>
        <p>Używane podręczniki w jednym miejscu</p>
      </div>
    </>
  )
}
