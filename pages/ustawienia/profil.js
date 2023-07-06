import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from '../../src/components/Layout'
import styles from '../../styles/profile.module.css'

import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Settings() {
  const { user, isLoading } = useUser()
  return (
    <Layout>
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.left}>
            <Link href='/ustawienia/profil' data-active="active">Profil</Link>
            <Link href='/ustawienia/wystawione' data-active="inactive">Wystawione</Link>
            <Link href='/api/auth/logout' className={styles.logout}>Wyloguj</Link>
          </div>
          <div className={styles.right}>
            <label htmlFor="fullName">Imię i Nazwisko</label>
            <input id="fullName" type="text" placeholder={!isLoading ? user.nickname : undefined} disabled />
            <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder={!isLoading ? user.email : undefined} disabled />
            <label htmlFor="pass">Hasło</label>
            <input id="pass" type="password" placeholder='*********' disabled />
            <a href="#!" className={styles.red_btn}>Usuń Konto <Image src="/assets/delete.svg" alt="" width={16} height={16} /></a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withPageAuthRequired()