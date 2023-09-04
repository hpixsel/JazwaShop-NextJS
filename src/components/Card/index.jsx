import React, { useRef } from 'react'
import styles from './card.module.css'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

export default function Card(slide) {
  const toast = useRef(null)

  const copyEmail = (e) => {
    navigator.clipboard.writeText(e.target.innerText)
    toast.current.className = classNames(styles.toast, styles.active)

    setTimeout(()=> {
      toast.current.className = classNames(styles.toast)
    }, 1500)
  }

  return (
    <div className={styles.card}>
      <Link href={"/ogloszenia/" + slide.id} className={styles.img__div}><Image src={process.env.NEXT_PUBLIC_ENDPOINT + slide.img} alt="" width={350} height={180} priority /></Link>
      <div className={styles.card__text}>
        <div className={styles.card__text__heading}>
          <h3>{slide.title}</h3>
          <p>{slide.price}zł</p>
          <span className={styles.tooltip}>{slide.title}</span>
        </div>
        <p>{slide.name}</p>
        <div className={styles.card__text__contact}>
          <div>
            <p>Tel: {slide.tel.slice(0,3)} {slide.tel.slice(3,6)} {slide.tel.slice(6,9)}</p>
            <p className={styles.email}>Email: <span className={styles.email__span} onClick={e => copyEmail(e)}>{slide.mail}</span></p>
          </div>
          <a href={slide.fb} target="_blank" rel="noreferrer noopenner">
            <Image src="/assets/facebook.svg" alt="facebook" width={32} height={32}/>
          </a>
        </div>
      </div>
      <div className={styles.toast} ref={toast}>
        <p>Skopiowano Email</p>
      </div>
    </div>
  )
}
