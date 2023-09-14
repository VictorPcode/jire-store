import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { IonImg } from '@ionic/react';
import 'swiper/swiper-bundle.css';
import img from '../assets/images/image1.png'
import img3 from '../assets/images/image3.png'


const Carousel = () => {
  return (

<Swiper
 autoplay={true}
 speed={1000}
 loop={true}
 slidesPerView={1}
 spaceBetween={0}
 centeredSlides={true}
 effect="fade"
 pagination={{ clickable: true }}
 scrollbar={{ draggable: false }}>

  <SwiperSlide>
    <IonImg src={img}/>
  </SwiperSlide>
  
  <SwiperSlide>
    <IonImg src={img3}/>
  </SwiperSlide>

</Swiper>


  )
}

Carousel.propTypes = {}

export default Carousel

