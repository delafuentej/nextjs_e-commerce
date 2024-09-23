
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperObject} from 'swiper';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';


interface Props {
  images: string[];
  title: string;
  className?:  string;
}

export const ProductSlideshow = ({images ,title, className}: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#a020f0',
          '--swiper-pagination-color': '#a020f0',
        } as React.CSSProperties
      } 
        spaceBetween={10}
        navigation={true}
        autoplay= {{
          delay: 3000
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map (image => (
            <SwiperSlide 
              key={image}
            >
              <Image 
                className='rounded-lg object-fill'
                width={1024}
                height={800}
                src={`/products/${image}`}
                alt={title}
              />
            
          </SwiperSlide>

          ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map (image => (
            <SwiperSlide 
              key={image}
            >
              <Image 
                className='rounded-lg object-fill'
                width={300}
                height={300}
                src={`/products/${image}`}
                alt={title}
              />
             
          </SwiperSlide>

          ))
        }
       
      </Swiper>


    </div>
   
  )
}