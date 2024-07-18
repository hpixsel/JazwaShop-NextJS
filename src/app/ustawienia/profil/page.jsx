import Image from 'next/image'
import Link from 'next/link'
import styles from '/styles/profile.module.css'
import axios from 'axios'
import { getSession } from '@lib/auth'

export default async function Settings() {
  const userData = await getSession()

  const deleteUser = async () => {
    const res = await axios.post('/api/delete-user', {
      hash: user.hash,
      id: userData.id
    })
  }

  return (
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
          <a href="#!" className={styles.red_btn}>Usuń Konto <Image src="/assets/delete.svg" alt="" width={16} height={16} /></a>
        </div>
      </div>
    </div>
  )
}