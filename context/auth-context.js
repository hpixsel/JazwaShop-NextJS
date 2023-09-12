import React, { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getCookie, hasCookie, setCookie } from 'cookies-next'

const AuthContext = createContext()
const { Provider } = AuthContext

function AuthProvider({children}) {
  const router = useRouter()
  const [authState, setAuthState] = useState(hasCookie('user') ? JSON.parse(getCookie('user')) : {
    user: '',
    session: ''
  })

  useEffect(() => {
    setCookie('user', authState, {sameSite: 'none', secure: true})
  }, [authState])

  const setUserAuthInfo = (user) => {
    setAuthState(user)
  }

  // user log state check
  const isUserAuthenticated = () => !!authState.session

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