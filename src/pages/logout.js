import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import axios from 'axios'
import Layout from '/src/components/Layout'
import Image from 'next/image'
import styles from '/styles/logout.module.css'
import jwtDecode from 'jwt-decode'
import { withIronSessionSsr } from 'iron-session/next'
import { ironOptions } from '../lib/iron-config'

export default function Logout({hash, userData}) {
  const router = useRouter()
  
  useEffect(() => {
    async function logout() {
      const res = await axios.post('/api/logout', {
        hash: hash,
        id: userData.id
      })
      if (res.status === 200) {
        router.push('/')
      }
    }
    logout()
  }, [router, hash, userData])

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

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  if (!req.session.user) {
    return {
      props: {},
      redirect: {
        destination: '/'
      }
    }
  } else {
    const user = req.session.user
    const hash = user.hash
    const userData = jwtDecode(user.user)
    return {
      props: { hash, userData },
    }
  }
}, ironOptions)