import React from 'react'


interface Props {
    label:string;
    info: string;
}

export const ProfileItem = ({label, info}:Props) => {
  return (
    <div className="flex flex-col border-1 border-black rounded-full border-solid shadow-xl mb-5">
        <span className="bg-purple-500 font-bold text-white p-2">{label}</span>
        <span className="text-2xl  text-gray-500 bg-white p-2 font-bold">
          {info}
        </span>
    </div>
  )
}
