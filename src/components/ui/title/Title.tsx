import { titleFont } from '@/config/fonts';
import React, { ReactNode } from 'react'


interface Props {
  title: string;
  subtitle?: string | ReactNode;
  className?: string;
}

export const Title = ({title, subtitle, className}: Props) => {
  return (
    <div className ={`${className} mt-3`}>
      <h1 className={`${titleFont} antialiased text-4xl font-semibold my-7`}>{title}</h1>
      {
        subtitle && (
          <h3 className='text-xl mb-5'>{subtitle}</h3>
        )
      }
    </div>
  )
} 
