import React from 'react'
import styles from '/styles/profile.module.css'
import StockCard from '/src/components/StockCard'
import classNames from 'classnames'
import Layout from '/src/components/Layout'
import Link from 'next/link'

import axios from 'axios'
import { withIronSessionSsr } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'
import jwtDecode from 'jwt-decode'

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
                <StockCard id={card.id} userId={props.userId} img={card.img} header={card.title} price={card.amount} date={card.date.timestamp} key={card.id} />
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const userData = jwtDecode(req.session.user.user)

  if (!req.session.user) {
    return {
      props: {},
      redirect: {
        destination: '/login'
      }
    }
  } else {
    try {
      const res = await axios.post(process.env.ENDPOINT + 'user/auctions', {
        "user-id": 7060
      })
      const data = res.data
  
      return {
        props: {
          data,
          userId: userData.id
        }
      }
    } catch (err) {
      console.log(err)
      return {
        props: {}
      }
    }
  }
  
}, ironOptions)