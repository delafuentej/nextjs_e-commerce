import { titleFont } from '@/config/fonts'
import Link from 'next/link'
import Image from 'next/image'


export const PageNotFound = () => {
  return (
    <div
      className='flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle'
    >
      <div 
        className='text-center px-5 mx-5'
      >
        <h2 className={`${titleFont.className} antialiased text-9xl` }>404</h2>
        <p className='font-semibold text-3xl'>Whoops! We are very sorry for this!</p>
        <p
        className='font-light'
        >
          <span className='text-2xl'>Go back to</span>
          <Link
          className='font-normal text-2xl p-2 hover:underline hover:bg-purple-500 hover:text-white transition-all ml-2'
          href='/'
          >
            Home
          </Link>
        </p>
      </div>

      {/* image */}
      <div className='px-5 mx-5 '>
        <Image 
          className='p-5 sm:p-0 rounded-full'
          src='/imgs/logo.jpg'
          alt='logo'
          width={550}
          height={550}
        />

      </div>
      
    </div>
  )
}
