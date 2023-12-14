import classNames from "classnames"
import Image from "next/image"
import React from "react"
import styles from "./stockcard.module.css"
import axios from "axios"
import { useRouter } from "next/router"
import Link from "next/link"

export default function index(card) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const date = new Date(card.date * 1000)
  const dateFormat =
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ", " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear()

  const deleteAuction = async id => {
    const form = new FormData()
    form.append("auction-id", id)
    form.append("user-id", card.userId)
    form.append("hash", card.hash)

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_ENDPOINT + "auction/delete",
        form
      )
      console.log(form)

      if (res.status === 200) {
        router.push("/ustawienia/wystawione")
      }
    } catch (err) {
      console.log(err)
    }
  }

  console.log(card)
  const data = {
    id: card.id,
    title: card.header,
    userId: card.userId,
    hash: card.hash,
    img: card.img,
    description: card.description,
    class: card.class,
    subject: card.subject,
    price: card.price,
  }

  return (
    <div className={styles.container} key={card.id}>
      <div className={styles.img_div}>
        <Link href={`/ogloszenia/${card.id}`}>
          <Image
            src={process.env.NEXT_PUBLIC_ENDPOINT + card.img}
            alt=""
            width={580}
            height={435}
          />
        </Link>
      </div>
      <div className={styles.text_div}>
        <div className={styles.header}>
          <h3>{card.header}</h3>
          <p>{card.price}zł</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottom_btns}>
            <a className={styles.btn} onClick={() => card.edit(data)}>
              Edytuj
              <Image src="/assets/pencil.svg" alt="" width={16} height={16} />
            </a>
            <a
              className={classNames(styles.btn, styles.red_btn)}
              onClick={() => deleteAuction(card.id)}
            >
              Usuń
              <Image src="/assets/delete.svg" alt="" width={16} height={16} />
            </a>
          </div>
          <p className={styles.date}>{dateFormat}</p>
        </div>
      </div>
    </div>
  )
}
