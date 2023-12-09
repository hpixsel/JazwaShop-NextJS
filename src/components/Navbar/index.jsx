import React, { useEffect, useState } from "react"
import styles from "./navbar.module.css"
import data from "./navbar.json"
import classNames from "classnames"
import Link from "next/link"
import Image from "next/image"
import jwtDecode from "jwt-decode"
import axios from "axios"

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    async function getUser() {
      const user = await axios.get("/api/get-user-session")
      if (user.data.user) {
        const userData = jwtDecode(user.data.user.user)
        setUser(userData)
      }
    }
    getUser()
  }, [])

  const links = data.links.map(link => {
    const linkWithSub = classNames(styles.link, {
      [styles.with_sublinks]: link.sublinks,
    })
    const sublinkClass = classNames(styles.link, styles.sublink)

    return (
      <div key={link.url}>
        <Link className={linkWithSub} href={link.url}>
          <Image src={"/assets/" + link.svg} alt="svg" width={30} height={30} />
          <p>{link.name}</p>
          {link.sublinks && (
            <Image
              className={styles.link__arrow}
              src="/assets/arrow.svg"
              alt="svg"
              width={16}
              height={16}
            />
          )}
        </Link>
        {link.sublinks &&
          link.sublinks.map(sublink => {
            return (
              <Link
                className={sublinkClass}
                href={sublink.url}
                key={sublink.url}
              >
                <Image
                  src={"/assets/" + sublink.svg}
                  alt="svg"
                  width={30}
                  height={30}
                />
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
  const linksClass = classNames(styles.links, { [styles.openNav]: openNav })

  return (
    <div className={`${styles.container} wrapper`}>
      <div className={styles.nav}>
        <Link className={styles.nav__logo} href="/">
          <Image
            className={styles.nav__logo__img}
            src="/assets/jazwastore.svg"
            alt="logo"
            width={48}
            height={48}
          />
          <h3 className={styles.nav__logo__h3}>JaźwaStore</h3>
        </Link>
        <Image
          src="/assets/hamburger.svg"
          alt="menu"
          onClick={toggleOpen}
          width={32}
          height={32}
        />
      </div>
      <div className={linksClass}>
        {links}
        <Link
          className={`${styles.link} ${user.id && styles.sublinks}`}
          href={user.id ? "/ustawienia/profil" : "/login"}
        >
          <Image src={"/assets/user.svg"} alt="svg" width={30} height={30} />
          {user.id ? user.username : "Zaloguj"}
          {user.id && (
            <Image
              className={styles.link__arrow}
              src="/assets/arrow.svg"
              alt="svg"
              width={16}
              height={16}
            />
          )}
        </Link>
        {user.id && (
          <>
            <Link
              className={classNames(styles.link, styles.sublink)}
              href="/ustawienia/profil"
            >
              <Image
                src={"/assets/gear.svg"}
                alt="svg"
                width={30}
                height={30}
              />
              Ustawienia Profilu
            </Link>
            <Link
              className={classNames(styles.link, styles.sublink)}
              href="/ustawienia/wystawione"
            >
              <Image
                src={"/assets/basket.svg"}
                alt="svg"
                width={30}
                height={30}
              />
              Wystawione
            </Link>
          </>
        )}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        {user.id && (
          <Link href="/logout" className={styles.logout}>
            Wyloguj
          </Link>
        )}
      </div>
    </div>
  )
}
