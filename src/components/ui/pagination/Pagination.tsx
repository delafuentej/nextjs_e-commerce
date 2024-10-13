'use client';

import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePaginationNumbers } from "@/utils/generatePaginationNumbers";
import clsx from "clsx";

interface Props {
    totalPages: number;
}

export const Pagination = ({totalPages}: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(Number(pageString)) ? 1 : Number(pageString);
 
    if( currentPage < 1 || isNaN(Number(pageString))) {
        redirect(pathName);
    }
    const allPages = generatePaginationNumbers(currentPage, totalPages);


   
  
    
    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        if( pageNumber === '...'){
            return `${pathName}?${params.toString()}`;
        }

        if(Number(pageNumber) <= 0){
            return `${pathName}`;
        }

        if(Number(pageNumber )> totalPages){
            return `${pathName}?${params.toString()}`;
        }
        
        params.set('page', pageNumber.toString());

        return `${pathName}?${params.toString()}`;

    }
  return (
    <div className="flex text-center justify-center mt-10 mb-32">
    <nav aria-label="Page navigation example">
      <ul className="flex list-style-none">

        <li className="page-item">
            <Link
            className={
                clsx(
                    "chevron-btn", 
                    {
                        'chevron-disabled shadow-xl pointer-events-none': currentPage === 1,
                    }
                )
            }
            href={createPageUrl(currentPage - 1)} >
                <IoChevronBackOutline size={25}/>
            </Link>
        </li>

        {
            allPages.map( (page, index)=> (
            <li 
            key={page + '-'+ index}

            className="page-item">
                 <Link
                    className={
                        clsx(
                            "page-link relative block py-1.5 px-3   mx-1 border-0 outline-none transition-all duration-300 rounded hover:bg-purple-400 hover:text-white hover:font-bold focus:shadow-none",
                            {
                                'shadow-md font-bold text-white bg-purple-500 hover:bg-purple-400 hover:text-gray-100' : page === currentPage
                            }
                        )
                    }
                    href={createPageUrl(page)}>{page}
                </Link>
            </li>
            ))
        }



        <li className="page-item">
            <Link
            className={
                clsx(
                    "chevron-btn mx-2",
                    {
                        'chevron-disabled pointer-events-none': currentPage === totalPages,
                        ' hover:bg-purple-400 ': currentPage !== totalPages,
                    }
                )
            }
            href={createPageUrl( currentPage + 1)}>
                <IoChevronForwardOutline size={25}/>
            </Link>
        </li>
      </ul>
    </nav>
  </div>
  )
}
