import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import SimpleDateTime from 'react-simple-timestamp-to-date'
import Layout from '../../src/components/Layout'
import styles from '../../styles/auction.module.css'

export default function ItemPage({data}) {
  return (
    <Layout>
      <div className={styles.center}>
        <h1 className={styles.title}>{data.title}</h1>
        <SimpleDateTime className={styles.date} dateSeparator="." dateFormat="DMY" timeFormat="HM" timeSeparator=":">{data.date.timestamp}</SimpleDateTime>
        <div className={styles.grid}>
          <div className={styles.img__div}>
            <Image src={"http://judasz.ddns.net:8002" + data.img} fill alt={data.title} priority />
          </div>
          <div className={styles.details}>
            <div>
              <h3>{data.user.username}</h3>
              <p><span>Tel:</span> {data.user.number}</p>
              <p><span>Email:</span> {data.user.email}</p>
              <hr className={styles.hr} />
              <p><span>Przedmiot:</span> {data.subject}</p>
              <p><span>Klasa:</span> {data.class}</p>
              <p className={styles.price}><span>Cena:</span> <span className={styles.price__span}>{data.amount}zł</span></p>
            </div>
            {data.user.facebook && <div className={styles.fb}>
              <a href={"https://www." + data.user.facebook} className={styles.fb_anchor} target="_blank" rel="noreferrer noopenner">
                <p>Facebook</p>
                <Image src="/assets/facebook.svg" alt="" width={36} height={36} />
              </a>
            </div>}
          </div>
        </div>
        <div className={styles.description}>
          <p>{data.description}</p>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const allItems = await axios.get('http://judasz.ddns.net:8002/')
  const allPaths = allItems.data.map(item => {
    return {
      params: {
        id: String(item.id)
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
  const allItems = await axios.get('http://judasz.ddns.net:8002/')

  const itemData = allItems.data.find(item => {
    return (
      id === String(item.id)
    )
  })


  return {
    props: {
      data: itemData
    }
  }
}