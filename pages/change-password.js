import React from 'react'
import classNames from 'classnames'
import styles from '../styles/login.module.css'
import Layout from '../src/components/Layout'

export default function PasswordChange() {
  const className = classNames(styles.bottom, styles.centered)
  return (
    <Layout>
      <div className={styles.container}>
        <form>
          <label htmlFor="pass">Nowe Hasło</label>
          <input id="pass" type="password" placeholder='*********' />
          <label htmlFor="passConfirm">Potwierdź Nowe Hasło</label>
          <input id="passConfirm" type="password" placeholder='*********' />
          <div className={className}>
            <input type="submit" value="Zmień Hasło" />
          </div>
        </form>
      </div>
    </Layout>
  )
}
