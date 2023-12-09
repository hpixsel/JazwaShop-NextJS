import React from 'react'
import styles from '/styles/profile.module.css'
import StockCard from '/src/components/StockCard'
import classNames from 'classnames'
import Layout from '/src/components/Layout'
import Link from 'next/link'

import axios from 'axios'

export default function Stock(props) {
  return (
    <Layout>
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.left}>
            <Link className={styles.add_button} href='/dodaj'>Dodaj ogłoszenie</Link>
            <Link href='/ustawienia/profil' data-active="inactive">Profil</Link>
            <Link href='/ustawienia/wystawione' data-active="active">Wystawione</Link>
            <Link href='/api/auth/logout' className={styles.logout}>Wyloguj</Link>
          </div>
          <div className={classNames(styles.right, styles.full_width_right)}>
            {props.data.map(card => {
              return(
                <StockCard id={card.id} img={card.img} header={card.title} price={card.amount} date={card.date.timestamp} key={card.id} />
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
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