import { useState } from "react";
import Layout from "/src/components/Layout";
import styles from "/styles/login.module.css"
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/iron-config";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [facebook, setFacebook] = useState('')
  const [number, setNumber] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handlePOST = async () => {
    if (password !== confirmPassword) {
      setMessage("Hasła się nie zgadzają")
      return
    }
    const res = await axios.post('api/register', {
      login,
      password,
      confPassword: confirmPassword,
      email,
      facebook,
      phone: number
    })

    const logoutReq = await axios.post('/api/logout', {
      hash: res.data.hash,
      id: res.data.id
    })

    const loginReq = await axios.post("/api/login", {
      login: login,
      password: password,
    })

    if (res.status === 200 && logoutReq.status === 200 && loginReq.status === 200) {
      router.push('/ustawienia/profil')
    }
  }

  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <form onSubmit={e => {e.preventDefault(); handlePOST()}}>
          <label htmlFor="login">Login *</label>
          <input type="text" id="login" onChange={e => setLogin(e.target.value)} required />
          <label htmlFor="password">Hasło *</label>
          <input type="password" id="password" onChange={e => setPassword(e.target.value)} required />
          <label htmlFor="confirm">Potwierdź Hasło *</label>
          <input type="password" id="confirm" onChange={e => setConfirmPassword(e.target.value)} required />
          <label htmlFor="email" className={styles.split}>Email *</label>
          <input type="email" id="email" onChange={e => setEmail(e.target.value)} required />
          <label htmlFor="facebook">Facebook (www.facebook.com/jankowalski)</label>
          <input type="text" id="email" onChange={e => setFacebook(e.target.value)} />
          <label htmlFor="number">Numer Telefonu</label>
          <input type="number" id="number" onChange={e => setNumber(e.target.value)} />

          <p className={styles.information}>Masz już konto? <Link href="/login">Zaloguj się</Link></p>
          <p className={styles.message}>{message}</p>
          <div className={styles.bottom}>
            <input type="submit" value="Zarejestruj" />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  if (!req.session.user) {
    return {
      props: {},
    }
  } else {
    return {
      props: {},
      redirect: {
        destination: '/'
      }
    }
  }
}, ironOptions)