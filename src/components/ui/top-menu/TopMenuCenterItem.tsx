'use client';

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";


interface Props {
    href: string;
    title: string
}

export const TopMenuCenterItem = ({ href, title}: Props) => {
  const currentPath = usePathname();
  
  return (
    <Link 
          className={
            clsx(
             ' m-2 p-2 rounded-md transition-all  hover:bg-purple-400 font-bold hover:text-white hover:font-bold', {
                'bg-purple-500 text-white font-bold animate-pulse transition-all': href === currentPath,
              }
            )
          }
           href={href}
        > {title}
    </Link>
  )
}

