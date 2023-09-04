import { useState } from "react";
import Layout from "../src/components/Layout";
import styles from "/styles/login.module.css"

export default function Login() {
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [facebook, setFacebook] = useState('')
  const [number, setNumber] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')

  const handlePOST = () => {
    console.log('Login: ' + login)
    console.log('Password: ' + password)
    console.log('CPassword: ' + confirmPassword)
    console.log('Email: ' + email)
    console.log('Facebook: ' + facebook)
    console.log('Number: ' + number)
  }

  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="login">Login</label>
          <input type="text" id="login" onChange={e => setLogin(e.target.value)} />
          <label htmlFor="password">Hasło</label>
          <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
          <label htmlFor="confirm">Potwierdź Hasło</label>
          <input type="password" id="confirm" onChange={e => setConfirmPassword(e.target.value)} />
          <label htmlFor="email" className={styles.split}>Email</label>
          <input type="text" id="email" onChange={e => setEmail(e.target.value)} />
          <label htmlFor="facebook">Facebook (www.facebook.com/jankowalski)</label>
          <input type="text" id="email" onChange={e => setFacebook(e.target.value)} />
          <label htmlFor="number">Numer Telefonu</label>
          <input type="number" id="number" onChange={e => setNumber(e.target.value)} />

          <div className={styles.bottom}>
            <input type="submit" value="Zarejestruj" onClick={() => handlePOST()} />
          </div>
        </form>
      </div>
    </Layout>
  )
}
