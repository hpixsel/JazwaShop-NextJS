import { useState } from "react";
import Layout from "../src/components/Layout";
import styles from "/styles/login.module.css"
import axios from "axios";
import shajs from "sha.js"

export default function Login() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const handlePOST = () => {
    console.log('Login: ' + login)
    console.log('Password: ' + shajs('SHA256').update(password).digest('hex'))

    axios.post('http://judasz.ddns.net:8000/login', {
      login: login,
      password: shajs('SHA256').update(password).digest('hex')
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (res) {
      console.log(res);
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
