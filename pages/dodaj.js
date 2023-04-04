import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useUser } from '@auth0/nextjs-auth0/client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../src/components/Layout'
import styles from '/styles/login.module.css'

export default function Dodaj() {
  const { user } = useUser()
  const [data, setData] = useState({
    "title": "",
    "description": "",
    "amount": null,
    "class": 1,
    "subject": "",
    "img": null
  })
  
  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  const handleImgUpload = (e) => {
    if (e.target.files) {
      setData(prevState => {
        return {
          ...prevState,
          "img": e.target.files[0]
        }
      });
    }
  }

  const handlePOST = () => {
    axios.post('http://judasz.ddns.net:8002/create', {
      userId: user.sub,
      auction: data
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <Layout>
      <div className={styles.container}>
        <form onSubmit={e => e.preventDefault()}>
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
          <input id="Value" type="number" min={0} step={1} onChange={e => {
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
          <input id="Img" type="file" onChange={e => handleImgUpload(e)} />

          <div className={styles.bottom}>
            <input type="submit" value="Wyślij" onClick={() => handlePOST()} />
          </div>
        </form>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withPageAuthRequired()