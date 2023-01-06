import Image from 'next/image'
import React from 'react'
import Layout from '../../src/components/Layout'
import styles from '../../styles/auction.module.css'

export default function ItemPage({data}) {
  return (
    <Layout>
      <div className={styles.center}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.date}>{data.added}</p>
        <div className={styles.grid}>
        <div className={styles.img__div}>
          <Image src={"/assets/" + data.img} fill alt={data.title} priority />
        </div>
          <div className={styles.details}>
            <div>
              <h3>{data.name}</h3>
              <p><span>Tel:</span> {data.tel}</p>
              <p><span>Email:</span> {data.mail}</p>
              <hr className={styles.hr} />
              <p><span>Przedmiot:</span> {data.subject}</p>
              <p><span>Klasa:</span> {data.class}</p>
              <p><span>Cena:</span> {data.price}zł</p>
            </div>
            {data.fb && <div className={styles.fb}>
              <a href={data.fb} className={styles.fb_anchor} target="_blank" rel="noreferrer noopenner">
                <p>Facebook</p>
                <Image src="/assets/facebook.svg" alt="" width={36} height={36} />
              </a>
            </div>}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const allItems = await import('../../src/components/Slider/slider.json')
  const allPaths = allItems.slider.map(item => {
    return {
      params: {
        id: item.id
      }
    }
  })

  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const id = context?.params.id
  const allItems = await import('../../src/components/Slider/slider.json')

  const itemData = allItems.slider.find(item => {
    return (
      id === item.id
    )
  })


  return {
    props: {
      data: itemData
    }
  }
}