import Head from 'next/head'
import React from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'

export default function Layout({children}) {
  return (
    <>
    <Head>
      <title>JazwaStore</title>
      <meta name="title" content="JazwaStore" />
      <meta name="language" content="Polish" />
      <meta name="description" content="Strona, na której znajdziesz używane podręczniki wystawiane przez samych uczniów oraz za pomocą naszej strony znajdziesz do nich łatwy kontakt " />
      <meta name="keywords" content="JazwaStore, JazwaShop, giełda, podręczniki, używane" />
      <meta name="author" content="Kacper Adamus & Kacper Janusz" />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </Head>

    <Navbar />
      <div className="container">
        {children}
      </div>
    <Footer />
    </>
  )
}
