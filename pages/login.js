import { useContext, useState } from "react";
import Layout from "../src/components/Layout";
import styles from "/styles/login.module.css"
import axios from "axios";
import shajs from "sha.js"
import { AuthContext } from "../context/auth-context";
import { useRouter } from "next/router";

export default function Login() {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handlePOST = () => {
    axios.post('http://judasz.ddns.net:8000/login', {
      login: login,
      password: shajs('SHA256').update(password).digest('hex')
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (res) {
      authContext.setAuthState(res.data)
      router.push('/ustawienia/profil')
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="login">Login</label>
          <input type="text" id="login" onChange={e => setLogin(e.target.value)} />
          <label htmlFor="password">Hasło</label>
          <input type="password" id="password" onChange={e => setPassword(e.target.value)} />

          <div className={styles.bottom}>
            <input type="submit" value="Zaloguj" onClick={() => handlePOST()} />
          </div>
        </form>
      </div>
    </Layout>
  )
}
