import React from 'react'
import styles from '../../styles/profile.module.css'
import tempData from '../../src/components/Slider/slider.json'
import StockCard from '../../src/components/StockCard'
import classNames from 'classnames'
import Layout from '../../src/components/Layout'
import Link from 'next/link'

import { withPageAuthRequired } from "@auth0/nextjs-auth0"

export default function Stock() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href='/ustawienia/profil' data-active="inactive">Profil</Link>
          <Link href='/ustawienia/wystawione' data-active="active">Wystawione</Link>
          <Link href='/api/auth/logout' className={styles.logout}>Wyloguj</Link>
        </div>
        <div className={classNames(styles.right, styles.full_width_right)}>
          {tempData.slider.map(card => {
            return(
              <StockCard img={card.img} header={card.title} price={card.price} date={card.added} key={card.id} />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withPageAuthRequired()