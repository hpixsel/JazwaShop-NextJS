import React from 'react'
import styles from './footer.module.css'
import data from './footer.json'
import Image from 'next/image'

export default function Footer() {
  const footerItems = data.items.map(data => {
    return (
      <div className={styles.footerItems} key={data.name}>
        <p>{data.name}:</p>
        {data.items && data.items.map(item => {
          return (
            <div className={styles.items} key={item.name}>
              {item.url
                ? <a href={item.url}>{item.name}</a>
                : <p>{item.name} {item.role && <span> - {item.role}</span>}</p> 
              }
              {item.github && <div className={styles.items__icons}>
                {item.github && <a href={item.github} target="_blank" rel='noopener noreferrer'><Image src="/assets/github.svg" alt="" width={32} height={32} /></a>}
                {item.website && <a href={item.website} target="_blank" rel='noopener noreferrer'><Image src="/assets/website.svg" alt="" width={32} height={32} /></a>}
              </div>}
            </div>
          )
        })}
      </div>
    )
  })


  return (
    <div className={styles.container}>
      {footerItems}
    </div>
  )
}
