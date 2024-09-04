'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from '/styles/profile.module.css'
import { getSession, deleteAccount } from '@lib/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Settings() {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    async function getUser() {
      const userData = await getSession()
      if (!userData) return null

      setUserData(userData)
    }

    getUser()
  }, [])

  async function handleDelete () {
    const res = await deleteAccount()

    if (res) router.push('/')
  }

  return (
    <>
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.left}>
          <Link className={styles.add_button} href='/dodaj'>Dodaj ogłoszenie</Link>
          <Link href='/ustawienia/profil' data-active="active">Profil</Link>
          <Link href='/ustawienia/wystawione' data-active="inactive">Wystawione</Link>
          <Link href='/logout' className={styles.logout}>Wyloguj</Link>
        </div>
        <div className={styles.right}>
          <label htmlFor="fullName">Imię i Nazwisko</label>
          <input id="fullName" type="text" placeholder={userData ? userData.username : undefined} disabled />
          <label htmlFor="email">Email</label>
          <input id="email" type="text" placeholder={userData ? userData.email : undefined} disabled />
          <label htmlFor="facebook">Facebook</label>
          <input id="facebook" type="text" placeholder={userData ? userData.facebook : undefined} disabled />
          <label htmlFor="number">Numer</label>
          <input id="number" type="text" placeholder={userData ? userData.number : undefined} disabled />
          <label htmlFor="pass">Hasło</label>
          <input id="pass" type="password" placeholder='*********' disabled />
          <a href="#!" className={styles.red_btn} onClick={() => setDeleteConfirm(true)}>Usuń Konto <Image src="/assets/delete.svg" alt="" width={16} height={16} /></a>
        </div>
      </div>
    </div>
    {deleteConfirm && <div className={styles.delete_confirm}>
      <h2>Czy na pewno chcesz usunąć konto?</h2>
      <div className={styles.delete_confirm__buttons}>
        <button className='btn' onClick={handleDelete}>Tak</button>
        <button className={styles.red_btn} onClick={() => setDeleteConfirm(false)}>Nie</button>
      </div>
    </div>}
    </>
  )
}