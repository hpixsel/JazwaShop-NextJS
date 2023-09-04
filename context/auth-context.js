import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'

const AuthContext = createContext()
const { Provider } = AuthContext

function AuthProvider({children}) {
  const router = useRouter()
  const [authState, setAuthState] = useState({
    username: '',
    email: '',
    facebook: '',
    number: '',
    hashPass: ''
  })

  useEffect(() => {
    setCookie('user', authState, {sameSite: 'none', secure: true})
  }, [authState])

  const setUserAuthInfo = (user) => {
    setAuthState(user)
  }

  // user log state check
  const isUserAuthenticated = () => !!authState.hashPass

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated
      }}
    >
      {children}
    </Provider>
  )
}

export {AuthContext, AuthProvider}