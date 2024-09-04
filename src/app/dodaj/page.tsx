'use client'
import React, { useState } from 'react'
import styles from '/styles/login.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { createAuction } from '@lib/auctions'

export default function Dodaj() {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState("/assets/placeholder-image.jpg")

  const handleImgUpload = (e) => {
    if (e.target.files) {
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  return (
    <div className={`wrapper ${styles.container}`}>
      <form action={async (formData: FormData) => {
        const res: any = await createAuction(formData)
        if (res === 200) router.push('/ustawienia/wystawione')
      }}>
        <label htmlFor="Title">Tytuł</label>
        <input id="Title" type="text" name="title" />
        <label htmlFor="Desc">Opis</label>
        <textarea id="Desc" rows={6} name="description" />
        <label htmlFor="Value">Cena</label>
        <input id="Value" type="number" min={0} step={0.1} max={9999} name="amount" />
        <label htmlFor="Class">Klasa</label>
        <select id='Class' name='class'>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>

        <label htmlFor="Subject">Przedmiot</label>
        <select id='Subject' name='subject'>
          <option value="Angielski">Angielski</option>
          <option value="Polski">Polski</option>
          <option value="Geografia">Geografia</option>
          <option value="Fizyka">Fizyka</option>
        </select>
        <label htmlFor="Img">Zdjęcie</label>
        <input id="Img" type="file" accept="image/png, image/jpeg" onChange={e => handleImgUpload(e)} name="img" />
        <div className={styles.imagePreview}>
          <Image fill sizes='(max-width: 768px) 100vw' src={imagePreview} alt='preview' />
        </div>
        <div className={styles.bottom}>
          <input type="submit" value="Wyślij" />
        </div>
      </form>
    </div>
  )
}