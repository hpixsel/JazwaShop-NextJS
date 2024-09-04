'use client'

import React, { useEffect, useState } from "react";
import Card from "@components/Card";
import styles from "/styles/store.module.css";
import { getAllAuctions } from "@lib/auctions";

export default function Store() {
  const [dataOG, setDataOG] = useState([]);
  const [input, setInput] = useState("");
  const [classSelect, setClassSelect] = useState("");
  const [subjectSelect, setSubjectSelect] = useState("");
  const [data, setData] = useState(dataOG);

  useEffect(() => {
    async function getAuctions() {
      const res = await getAllAuctions();
      setDataOG(res);
    }

    getAuctions()
  }, [])

  useEffect(() => {
    setData(
      dataOG.filter((item: Auction) => {
        const itemTitle = item.title.toLowerCase();
        if (itemTitle.includes(input.toLowerCase())) {
          return item;
        }
      })
    );
    setData((prevState) =>
      prevState.filter((item: Auction) => {
        const itemClass = String(item.class);
        if (itemClass.includes(classSelect)) {
          return item;
        }
      })
    );
    setData((prevState) =>
      prevState.filter((item: Auction) => {
        const itemSubject = item.subject;
        if (itemSubject.includes(subjectSelect)) {
          return item;
        }
      })
    );
  }, [input, classSelect, subjectSelect, dataOG]);

  return (
    <>
      <div className={`${styles.filters} wrapper`}>
        <input onInput={(e: any) => setInput(e.target.value)} type="text" />
        <div className={styles.filters__child}>
          <label htmlFor="class">Klasa:</label>
          <select
            name="klasa"
            id="class"
            onInput={(e: any) => setClassSelect(e.target.value)}
          >
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={styles.filters__child}>
          <label htmlFor="subject">Przedmiot:</label>
          <select
            name="przedmiot"
            id="subject"
            onInput={(e: any) => setSubjectSelect(e.target.value)}
          >
            <option value=""></option>
            <option value="Polski">Polski</option>
            <option value="Matematyka">Matematyka</option>
            <option value="Angielski">Angielski</option>
            <option value="Niemiecki">Niemiecki</option>
            <option value="Religia">Religia</option>
          </select>
        </div>
      </div>

      <hr className={`${styles.hr} wrapper`} />

      {
        dataOG.length > 0 ? <div className={`${styles.grid} wrapper`}>
          {data.map((item: Auction) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              img={item.img}
              name={item.user.username}
              tel={String(item.user.number)}
              price={item.amount}
              mail={item.user.email}
              fb={item.user.facebook}
            />
          ))}
        </div> : <div className="wrapper error"><h1>Wystąpił błąd</h1></div>
      }
    </>
  );
}

interface Auction {
  id: number
  title: string
  img: string
  amount: number
  hash: string
  class: number
  subject: string
  description: string
  user: {
    username: string
    number: string
    email: string
    facebook: string
  }
}