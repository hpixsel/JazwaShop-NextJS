import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import styles from "/styles/login.module.css"
import axios from "axios"
import shajs from "sha.js"
import { useRouter } from "next/router"
import { ironOptions } from "../lib/iron-config"
import { withIronSessionSsr } from "iron-session/next"
import Link from "next/link"

export default function Login() {
  const router = useRouter()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handlePOST = async () => {
    const res = await axios.post("/api/login", {
      login: login,
      password: password,
    })
    if (res.status === 200) {
      router.push('/ustawienia/profil')
    }
    if (res.data.status === 401) {
      setMessage(res.data.message)
    }
  }

  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            onChange={e => setLogin(e.target.value)}
          />
          <label htmlFor="password">Hasło</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
          <p className={styles.information}>Nie masz jeszcze konta? <Link href="/register">Zarejestruj się</Link></p>
          <p className={styles.message}>{message}</p>

          <div className={styles.bottom}>
            <input type="submit" value="Zaloguj" onClick={() => handlePOST()} />
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