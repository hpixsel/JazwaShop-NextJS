import Link from 'next/link'
import React from 'react'
import Layout from '../src/components/Layout'
import styles from '../styles/login.module.css'

export default function Login() {
  return (
    <Layout>
      <div className={styles.container}>
        <form>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" placeholder='jan@kowalski.pl' />
          <label htmlFor="pass">Hasło</label>
          <input id="pass" type="password" placeholder='*********' />
          <a href='#!'>Zapomniałem hasła</a>
          <div className={styles.bottom}>
            <input type="submit" value="Zaloguj" />
            <p>Nie masz jeszcze konta? <Link href="/register">Zarejestruj się!</Link></p>
          </div>
        </form>
      </div>
    </Layout>
  )
}
