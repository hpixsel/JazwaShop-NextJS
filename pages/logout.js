import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '/context/auth-context'
import axios from 'axios'
import Layout from '../src/components/Layout'
import Image from 'next/image'
import styles from '/styles/logout.module.css'
import { getUser } from '../lib/getUser'

export default function Logout() {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  const [user, setUser] = useState({user: '', session: ''})

  useEffect(() => {
    setUser(getUser())
    console.log(user)
  }, [])

  useEffect(() => {
    axios.post(process.env.NEXT_PUBLIC_ENDPOINT + 'user/logout', {
      hash: user.session,
      id: user.id
    })

    /* authContext.setAuthState({
      user: '',
      session: ''
    }) */

    router.push('/')
  }, [])

  return (
    <Layout>
      <div className='wrapper'>
        <h1 className={styles.header}>Trwa wylogowywanie...</h1>
        <div className={styles.img_div}>
          <Image src='/assets/logout.svg' fill alt='logout SVG' />
        </div>
      </div>
    </Layout>
  )
}