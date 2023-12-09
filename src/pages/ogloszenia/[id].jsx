import axios from "axios"
import Image from "next/image"
import React from "react"
import Layout from "/src/components/Layout"
import styles from "/styles/auction.module.css"

export default function ItemPage({ data }) {
  const date = new Date(data.date.timestamp * 1000)
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
  const number = String(data.user.number)

  return (
    <Layout>
      <div className={`${styles.center} wrapper`}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.date}>{dateFormat}</p>
        <div className={styles.grid}>
          <div className={styles.img__div}>
            <Image
              src={"http://judasz.ddns.net:8000/" + data.img}
              fill
              alt={data.title}
              priority
            />
          </div>
          <div className={styles.details}>
            <div>
              <h3>{data.user.username}</h3>
              {number !== "undefined" && (
                <p>
                  <span>Tel:</span> {number.slice(0, 3)} {number.slice(3, 6)}{" "}
                  {number.slice(6, 9)}
                </p>
              )}
              <p>
                <span>Email:</span> {data.user.email}
              </p>
              <hr className={styles.hr} />
              <p>
                <span>Przedmiot:</span> {data.subject}
              </p>
              <p>
                <span>Klasa:</span> {data.class}
              </p>
              <p className={styles.price}>
                <span>Cena:</span>{" "}
                <span className={styles.price__span}>{data.amount}zł</span>
              </p>
            </div>
            {data.user.facebook && (
              <div className={styles.fb}>
                <a
                  href={"https://www." + data.user.facebook}
                  className={styles.fb_anchor}
                  target="_blank"
                  rel="noreferrer noopenner"
                >
                  <p>Facebook</p>
                  <Image
                    src="/assets/facebook.svg"
                    alt=""
                    width={36}
                    height={36}
                  />
                </a>
              </div>
            )}
          </div>
        </div>
        <div className={styles.description}>
          <p>{data.description}</p>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.id
  const allItems = await axios.get(process.env.ENDPOINT)

  const itemData = allItems.data.find(item => {
    return id === String(item.id)
  })

  return {
    props: {
      data: itemData,
    },
  }
}
