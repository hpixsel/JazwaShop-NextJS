import React from 'react'
import styles from '../../styles/profile.module.css'
import tempData from '../../src/components/Slider/slider.json'
import StockCard from '../../src/components/StockCard'
import classNames from 'classnames'
import Layout from '../../src/components/Layout'
import Link from 'next/link'

import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import axios from 'axios'

export default function Stock(props) {
  return (
    <Layout>
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href='/ustawienia/profil' data-active="inactive">Profil</Link>
            <Link href='/ustawienia/wystawione' data-active="active">Wystawione</Link>
            <Link href='/api/auth/logout' className={styles.logout}>Wyloguj</Link>
          </div>
          <div className={classNames(styles.right, styles.full_width_right)}>
            {props.data.map(card => {
              return(
                <StockCard img={card.img} header={card.title} price={card.price} date={card.added} key={card.id} />
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  withPageAuthRequired()

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
}