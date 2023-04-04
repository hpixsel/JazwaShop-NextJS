import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../src/components/Card";
import Layout from "../../src/components/Layout";
import tempData from "../../src/components/Slider/slider.json";
import styles from "../../styles/store.module.css";

export default function Store(props) {
  const dataOG = props.data;

  const [input, setInput] = useState("");
  const [classSelect, setClassSelect] = useState("");
  const [subjectSelect, setSubjectSelect] = useState("");
  const [data, setData] = useState(dataOG);

  useEffect(() => {
    setData(
      dataOG.filter((item) => {
        const itemTitle = item.title.toLowerCase();
        if (itemTitle.includes(input.toLowerCase())) {
          return item;
        }
      })
    );
    setData((prevState) =>
      prevState.filter((item) => {
        console.log(classSelect)
        const itemClass = String(item.class);
        if (itemClass.includes(classSelect)) {
          return item;
        }
      })
    );
    setData((prevState) =>
      prevState.filter((item) => {
        const itemSubject = item.subject;
        if (itemSubject.includes(subjectSelect)) {
          return item;
        }
      })
    );
  }, [input, classSelect, subjectSelect, dataOG]);

  return (
    <Layout>
      <div className={styles.filters}>
        <input onInput={(e) => setInput(e.target.value)} type="text" />
        <div className={styles.filters__child}>
          <label htmlFor="class">Klasa:</label>
          <select
            name="klasa"
            id="class"
            onInput={(e) => setClassSelect(e.target.value)}
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
            onInput={(e) => setSubjectSelect(e.target.value)}
          >
            <option value=""></option>
            <option value="Polski">Polski</option>
            <option value="Matematyka">Matematyka</option>
            <option value="Angielski">Angielski</option>
            <option value="Niemiecki">Niemiecki</option>
          </select>
        </div>
      </div>

      <hr className={styles.hr} />

      <div className={styles.grid}>
        {data.map((item) => (
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
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const rawData = await axios.get('http://judasz.ddns.net:8002/')
  const data = rawData.data

  return {
    props: {
      data
    }
  }
}