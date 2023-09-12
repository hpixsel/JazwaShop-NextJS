import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '/context/auth-context'

export default function Logout() {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    authContext.setAuthState({
      user: '',
      session: ''
    })
    router.push('/')
  }, [])

  return (
    <h1 className='wrapper' style={{marginTop: '2rem'}}>Trwa wylogowywanie...</h1>
  )
}
