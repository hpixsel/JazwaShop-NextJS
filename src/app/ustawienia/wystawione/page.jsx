'use client'

import React, { useEffect, useState } from "react"
import styles from "/styles/profile.module.css"
import StockCard from "/src/components/StockCard"
import classNames from "classnames"
import Layout from "/src/components/Layout"
import Link from "next/link"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getAllAuctions } from "@lib/auctions"

export default function Stock(props) {
  const router = useRouter()
  const [editing, setEditing] = useState()
  const [allAuctions, setAllAuctions] = useState([])

  useEffect(() => {
    async function getAuctions () {
      const res = await getAllAuctions()
      setAllAuctions(res)
    }
    getAuctions()
  }, [])

  const editAuction = props => {
    setEditing(props)
  }

  const exitAuction = () => setEditing()

  const handlePOST = async () => {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_ENDPOINT + "auction/update",
      {
        id: editing.id,
        title: editing.title,
        img: editing.img,
        amount: editing.price,
        user: editing.userId,
        hash: editing.hash,
        class: editing.class,
        subject: editing.subject,
        description: editing.description,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    if (res.status === 200) {
      setEditing()
      router.push("/ustawienia/wystawione")
    }
  }

  return (
  <>
      {editing?.id !== undefined && (
        <div className={styles.edit}>
          <div className={styles.edit__container}>
            <div className={styles.edit__header}>
              <h2>{editing.title}</h2>
              <div onClick={exitAuction}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 100 100"
                >
                  <path
                    fill="currentColor"
                    d="M84.707 68.752L65.951 49.998l18.75-18.752a1.989 1.989 0 0 0 0-2.813L71.566 15.295a1.99 1.99 0 0 0-2.814 0L49.999 34.047l-18.75-18.752c-.746-.747-2.067-.747-2.814 0L15.297 28.431a1.992 1.992 0 0 0 0 2.814L34.05 49.998L15.294 68.753a1.993 1.993 0 0 0 0 2.814L28.43 84.704a1.988 1.988 0 0 0 2.814 0l18.755-18.755l18.756 18.754c.389.388.896.583 1.407.583s1.019-.195 1.408-.583l13.138-13.137a1.99 1.99 0 0 0-.001-2.814"
                  />
                </svg>
              </div>
            </div>
            <div className={styles.edit__img}>
              <Image
                src={process.env.NEXT_PUBLIC_ENDPOINT + editing.img}
                alt={editing.title}
                width={480}
                height={270}
              />
            </div>
            <form onSubmit={e => e.preventDefault()}>
              <label htmlFor="title">Tytuł</label>
              <input
                required
                type="text"
                id="title"
                defaultValue={editing.title}
                onChange={e =>
                  setEditing(prevState => ({
                    ...prevState,
                    title: e.target.value,
                  }))
                }
              />
              <label htmlFor="cena">Cena</label>
              <input
                required
                type="number"
                id="cena"
                min={0}
                step={0.1}
                max={9999}
                defaultValue={editing.price}
                onChange={e =>
                  setEditing(prevState => ({
                    ...prevState,
                    price: e.target.value,
                  }))
                }
              />

              <label htmlFor="desc">Opis</label>
              <textarea
                required
                type="text"
                id="desc"
                rows={5}
                defaultValue={editing.description}
                onChange={e =>
                  setEditing(prevState => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
              />

              <label htmlFor="class">Klasa</label>
              <select
                id="class"
                defaultValue={editing.class}
                onChange={e => {
                  setEditing(prevState => {
                    return {
                      ...prevState,
                      class: e.target.value,
                    }
                  })
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <label htmlFor="subject">Przedmiot</label>
              <select
                id="subject"
                defaultValue={editing.subject}
                onChange={e => {
                  setEditing(prevState => {
                    return {
                      ...prevState,
                      subject: e.target.value,
                    }
                  })
                }}
              >
                <option value="Angielski">Angielski</option>
                <option value="Polski">Polski</option>
                <option value="Geografia">Geografia</option>
                <option value="Fizyka">Fizyka</option>
              </select>

              <div className={styles.bottom}>
                <input
                  type="submit"
                  value="Zaktualizuj"
                  onClick={() => handlePOST()}
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="wrapper">
        <div className={styles.container}>
          <div className={styles.left}>
            <Link className={styles.add_button} href="/dodaj">
              Dodaj ogłoszenie
            </Link>
            <Link href="/ustawienia/profil" data-active="inactive">
              Profil
            </Link>
            <Link href="/ustawienia/wystawione" data-active="active">
              Wystawione
            </Link>
            <Link href="/logout" className={styles.logout}>
              Wyloguj
            </Link>
          </div>
          <div className={classNames(styles.right, styles.full_width_right)}>
            {/* {props.data.map(card => {
              return (
                <StockCard
                  id={card.id}
                  userId={props.userId}
                  hash={props.userHash}
                  edit={editAuction}
                  header={card.title}
                  description={card.description}
                  class={card.class}
                  subject={card.subject}
                  img={card.img}
                  price={card.amount}
                  date={card.date.timestamp}
                  key={card.id}
                />
              )
            })} */}
          </div>
        </div>
      </div>
      </>
  )
}

/* export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const userData = jwtDecode(req.session.user.user)

  if (!req.session.user) {
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    }
  } else {
    try {
      const res = await axios.post(process.env.ENDPOINT + "user/auctions", {
        "user-id": userData.id,
      })
      const data = res.data

      return {
        props: {
          data,
          userId: userData.id,
          userHash: req.session.user.hash,
        },
      }
    } catch (err) {
      console.log(err)
      return {
        props: {},
      }
    }
  }
}, ironOptions) */
