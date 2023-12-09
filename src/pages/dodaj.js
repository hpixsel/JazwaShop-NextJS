import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '/src/components/Layout'
import styles from '/styles/login.module.css'
import {v4 as uuidv4} from 'uuid'
import Image from 'next/image'
import jwtDecode from 'jwt-decode'
import { withIronSessionSsr } from 'iron-session/next'
import { ironOptions } from '../lib/iron-config'
import { useRouter } from 'next/router'

export default function Dodaj() {
  const router = useRouter()
  const [data, setData] = useState({
    "title": "",
    "description": "",
    "amount": null,
    "class": 1,
    "subject": "Angielski",
    "img": null
  })
  const [imagePreview, setImagePreview] = useState("/assets/placeholder-image.jpg")
  const [userId, setUserId] = useState({})

  useEffect(() => {
    async function getUser() {
      const user = await axios.get("/api/get-user-session")
      if (user.data.user) {
        const userData = jwtDecode(user.data.user.user)
        setUserId(userData.id)
      }
    }
    getUser()
  }, [])

  const handleImgUpload = (e) => {
    if (e.target.files) {
      setData(prevState => {
        return {
          ...prevState,
          "img": e.target.files[0]
        }
      });
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handlePOST = async () => {
    const res = await axios.post(process.env.NEXT_PUBLIC_ENDPOINT + 'auction/create', {
      amount: data.amount,
      class: data.class,
      date: "now",
      description: data.description,
      id: uuidv4(),
      img: data.img,
      subject: data.subject,
      title: data.title,
      user: userId,
      status: 0
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (res.status === 200) {
      router.push("/ustawienia/wystawione")
    }
  }

  return (
    <Layout>
      <div className={`wrapper ${styles.container}`}>
        <form onSubmit={e => {e.preventDefault(); handlePOST()}}>
          <label htmlFor="Title">Tytuł</label>
          <input id="Title" type="text" onChange={e => {
            setData(prevState => {
              return {
                ...prevState,
                "title": e.target.value
              }
            })
          }} />
          <label htmlFor="Desc">Opis</label>
          <textarea id="Desc" rows={6} onChange={e => {
            setData(prevState => {
              return {
                ...prevState,
                "description": e.target.value
              }
            })
          }} />
          <label htmlFor="Value">Cena</label>
          <input id="Value" type="number" min={0} step={0.1} max={9999} onChange={e => {
            setData(prevState => {
              return {
                ...prevState,
                "amount": e.target.value
              }
            })
          }} />
          <label htmlFor="Class">Klasa</label>
          <select id='Class' onChange={e => {
            setData(prevState => {
              return {
                ...prevState,
                "class": e.target.value
              }
            })
          }}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <label htmlFor="Subject">Przedmiot</label>
          <select id='Subject' onChange={e => {
            setData(prevState => {
              return {
                ...prevState,
                "subject": e.target.value
              }
            })
          }}>
            <option value="Angielski">Angielski</option>
            <option value="Polski">Polski</option>
            <option value="Geografia">Geografia</option>
            <option value="Fizyka">Fizyka</option>
          </select>
          <label htmlFor="Img">Zdjęcie</label>
          <input id="Img" type="file" accept="image/png, image/jpeg" onChange={e => handleImgUpload(e)} />
          <div className={styles.imagePreview}>
            <Image fill sizes='(max-width: 768px) 100vw' src={imagePreview} alt='preview' />
          </div>
          <div className={styles.bottom}>
            <input type="submit" value="Wyślij" />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  if (req.session.user) {
    return {
      props: {},
    }
  } else {
    return {
      props: {},
      redirect: {
        destination: '/'
      }
    }
  }
}, ironOptions)