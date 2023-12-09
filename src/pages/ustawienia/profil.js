import Image from 'next/image'
import Link from 'next/link'
import Layout from '/src/components/Layout'
import styles from '/styles/profile.module.css'
import { withIronSessionSsr } from 'iron-session/next'
import { ironOptions } from '../../lib/iron-config'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Settings({user}) {
  const userData = jwtDecode(user.user)
  const router = useRouter()

  const deleteUser = async () => {
    const res = await axios.post('/api/delete-user', {
      hash: user.hash,
      id: userData.id
    })
    if (res.status === 200) {
      router.push('/')
    }
  }

  return (
    <Layout>
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
            <label htmlFor="pass">Hasło</label>
            <input id="pass" type="password" placeholder='*********' disabled />
            <a href="#!" className={styles.red_btn} onClick={() => deleteUser()}>Usuń Konto <Image src="/assets/delete.svg" alt="" width={16} height={16} /></a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  if (!req.session.user) {
    return {
      props: {},
      redirect: {
        destination: '/login'
      }
    }
  } else {
    return {
      props: {
        user: req.session.user
      }
    }
  }
}, ironOptions)