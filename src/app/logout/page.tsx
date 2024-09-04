'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import styles from '/styles/logout.module.css'
import { logout } from '@lib/auth'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    async function logoutFunction() {
      const res = await logout()
      if (res) router.push('/')
    }
    logoutFunction()
  }, [router])

  return (
    <div className='wrapper'>
      <h1 className={styles.header}>Trwa wylogowywanie...</h1>
      <div className={styles.img_div}>
        <Image src='/assets/logout.svg' fill alt='logout SVG' />
      </div>
    </div>
  )
}