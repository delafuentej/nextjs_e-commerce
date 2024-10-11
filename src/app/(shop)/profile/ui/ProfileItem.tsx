import React from 'react'


interface Props {
    label:string;
    info: string;
}

export const ProfileItem = ({label, info}:Props) => {
  return (
    <div className="flex flex-col">
        <span className="bg-purple-500 font-bold text-white p-2 rounded">{label}</span>
        <span className="text-2xl  text-gray-500 font-bold mb-5">
          {info}
        </span>

    </div>
  )
}
