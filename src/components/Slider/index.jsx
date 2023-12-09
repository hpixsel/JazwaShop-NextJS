import React from "react"
import Slider from "react-slick"
import Card from "../Card"
import styles from "./slider.module.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

export default function SliderComponent(props) {
  const settings = {
    infinite: true,
    centerMode: true,
    slidesToShow: 4,
    arrows: false,
    autoplay: true,
    pauseOnHover: true,
    speed: 1000,
    centerPadding: "0px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1,
          centerPadding: "64px",
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          centerPadding: "64px",
        },
      },
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 3,
          centerPadding: "64px",
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 4,
          centerPadding: "100px",
        },
      },
    ],
  }

  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {props.data.map(slide => {
          return (
            <Card
              key={slide.id}
              id={slide.id}
              title={slide.title}
              img={slide.img}
              name={slide.user.username}
              tel={String(slide.user.number)}
              price={slide.amount}
              mail={slide.user.email}
              fb={slide.user.facebook}
            />
          )
        })}
      </Slider>
    </div>
  )
}
