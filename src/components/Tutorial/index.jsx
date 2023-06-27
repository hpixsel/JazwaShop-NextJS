import Image from 'next/image'
import React from 'react'
import styles from './tutorial.module.css'

export default function Tutorial() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content__text}>
          <h2>Jak zacząć działać?</h2>
          <div className={styles.content__text__points}>
            <div className={styles.content__text__row}>
              <Image src="/assets/tutorial-1.svg" alt="numbers" width={32} height={32} />
              <p>Zarejestruj/Zaloguj się</p>
            </div>
            <div className={styles.content__text__row}>
              <Image src="/assets/tutorial-2.svg" alt="numbers" width={32} height={32} />
              <p>Zrób zdjęcie i przygotuj opis</p>
            </div>
            <div className={styles.content__text__row}>
              <Image src="/assets/tutorial-3.svg" alt="numbers" width={32} height={32} />
              <p>Dodaj swoją książkę</p>
            </div>
            <div className={styles.content__text__row}>
              <Image src="/assets/tutorial-4.svg" alt="numbers" width={32} height={32} />
              <p>Gotowe! Teraz zaczekaj na kontakt</p>
            </div>
          </div>
        </div>
        <div className={styles.svg}>
          <Image src="/assets/tutorial.svg" alt="svg" width={335} height={251}/>
        </div>
        <div className={styles.bg}>
          <Image src="/assets/tutorial-bg.png" alt="svg" width={1565} height={1175}/>
        </div>
      </div>
    </div>
  )
}
