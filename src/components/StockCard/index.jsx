import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'
import styles from './stockcard.module.css'

export default function index(card) {
  return (
    <div className={styles.container} key={card.id}>
      <div className={styles.img_div}>
        <Image src={"/assets/" + card.img} alt="" width={580} height={435} />
      </div>
      <div className={styles.text_div}>
        <div className={styles.header}>
          <h3>{card.header}</h3>
          <p>{card.price}zł</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottom_btns}>
            <a href="#!" className={styles.btn}>Edytuj<Image src="/assets/pencil.svg" alt="" width={16} height={16} /></a>
            <a href="#!" className={classNames(styles.btn, styles.red_btn)}>Usuń<Image src="/assets/delete.svg" alt="" width={16} height={16} /></a>
          </div>
          <p className={styles.date}>{card.date}</p>
        </div>
      </div>
    </div>
  )
}
