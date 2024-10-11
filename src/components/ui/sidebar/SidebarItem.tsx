'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";


interface Props {
    href: string;
    label: string;
    icon: React.ComponentType<{size: number}>;
    onClick?: () => void;
}

export const SidebarItem = ({href, label, icon: Icon, onClick}: Props) => {

  const currentPath = usePathname();
//flex items-center mt-10 p-2 hover:bg-purple-200 rounded transition-all
  return (
    <Link
    href={href}
    className={
      clsx(
        'flex items-center mt-10  hover:bg-purple-400  m-2 p-2 rounded-md transition-all   font-bold hover:text-white hover:font-bold', {
           'bg-purple-500 text-white font-bold animate-pulse transition-all': href === currentPath,
         }
       )
    }
    onClick= {onClick}
  >
    <Icon size={30} />
    <span className='text-xl ml-3'>{label}</span>
  </Link>
  )
}
