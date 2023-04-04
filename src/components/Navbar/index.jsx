import React, { useState } from 'react'
import styles from './navbar.module.css'
import data from './navbar.json'
import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false)
  const { user, isLoading} = useUser()
  
  const links = data.links.map(link => {
    const linkWithSub = classNames(styles.link, {[styles.with_sublinks]: link.sublinks})
    const sublinkClass = classNames(styles.link, styles.sublink)

    return (
      <div key={link.url}>
        <Link className={linkWithSub} href={link.url}>
          <Image src={"/assets/" + link.svg} alt="svg" width={30} height={30} />
          <p>{link.name}</p>
          {link.sublinks && <Image className={styles.link__arrow} src="/assets/arrow.svg" alt="svg" width={16} height={16} />}
        </Link>
        {link.sublinks && link.sublinks.map(sublink => {
          return (
            <Link className={sublinkClass} href={sublink.url} key={sublink.url}>
              <Image src={"/assets/" + sublink.svg} alt="svg" width={30} height={30} />
              <p>{sublink.name}</p>
            </Link>
          )
        })}
      </div>
    )
  })

  //toggle nav links div
  const toggleOpen = () => {
    setOpenNav(prevState => !prevState)
  }

  //linking classes based of state
  const linksClass = classNames(styles.links, {[styles.openNav]: openNav})
  
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link className={styles.nav__logo} href="/">
          <Image className={styles.nav__logo__img} src="/assets/jazwastore.svg" alt="logo" width={48} height={48} />
          <h3 className={styles.nav__logo__h3}>JaźwaStore</h3>
        </Link>
        <Image src="/assets/hamburger.svg" alt="menu" onClick={toggleOpen} width={32} height={32} />
      </div>
      <div className={linksClass}>
        {links}
        <Link className={classNames(styles.link, styles.with_sublinks)} href={user ? "/ustawienia/profil" : "/api/auth/login"}>
          <Image src={"/assets/user.svg"} alt="svg" width={30} height={30} />
          {!isLoading && user ? <p>{user.nickname}</p> : <p>Zaloguj / Zarejestruj</p>}
          <Image className={styles.link__arrow} src="/assets/arrow.svg" alt="svg" width={16} height={16} />
        </Link>
        <Link className={classNames(styles.link, styles.sublink)} href="/ustawienia/profil">
              <Image src={"/assets/gear.svg"} alt="svg" width={30} height={30} />
              <p>Ustawienia Profilu</p>
        </Link>
        <Link className={classNames(styles.link, styles.sublink)} href="/ustawienia/wystawione">
              <Image src={"/assets/basket.svg"} alt="svg" width={30} height={30} />
              <p>Wystawione</p>
        </Link>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        {user && <a href='/api/auth/logout' className={styles.logout}>Wyloguj</a>}
      </div>
    </div>
  )
}
