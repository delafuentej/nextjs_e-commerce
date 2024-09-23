
'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


import './slideshow.css';


interface Props {
  images: string[];
  title: string;
  className?:  string;
}

export const ProductMobileSlideshow = ({images ,title, className}: Props) => {


  return (
    <div className={className}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#a020f0',
          '--swiper-pagination-color': '#a020f0',
          width: '100vw',
          height:'500px',

        } as React.CSSProperties
      } 
       
       pagination
        autoplay= {{
          delay: 3000
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
          images.map (image => (
            <SwiperSlide 
              key={image}
            >
              <Image 
                className='object-fill'
                width={600}
                height={500}
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
