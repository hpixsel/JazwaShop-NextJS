import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect } from 'react'
import Layout from '../../src/components/Layout'
import styles from '../../styles/profile.module.css'
import { AuthContext } from '../../context/auth-context'
import { useRouter } from 'next/router'

export default function Settings() {
  const router = useRouter()
  const authContext = useContext(AuthContext)
  
  useEffect(() => {
    authContext.isUserAuthenticated()
    ? router.push("/ustawienia/profil")
    : router.push("/login")
  }, [])

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