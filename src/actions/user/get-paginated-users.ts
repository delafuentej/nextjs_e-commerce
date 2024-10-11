'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";


interface PaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedUsers = async ({
    page = 1,
    take = 10,
}:PaginationOptions) => {

    if(isNaN(Number(page))) page = 1;
    if(page < 1) page = 1;

    // to abtain the session authenticated user
    const session = await auth();

    // check if the user is an administrator
    if(session?.user.role !== 'admin'){
        return {
            ok:false,
            message:'User must be administrator'
        }
    };

    try{
        const users = await prisma.user.findMany({
            take: take,
            skip:(page-1) * take,
            orderBy: {
                firstName:'desc'
            }
        });
    
      
        console.log('usersXXX', users)
    
        // obtain the total number of users
        const totalUsers = await prisma.user.count();
        console.log('totalUsers',totalUsers)
    
        // obtain the num total of pages
        const totalPages = Math.ceil(totalUsers / take)
    
    
    
        return {
            ok:true,
            users: users,
            currentPage: page,
            totalPages: totalPages,
            totalUsers: totalUsers,
        }



    }catch(error){
        console.log('Error fetching users',error)
        return{
            ok:false,
            message: 'Error fetching users',
        }
    }

   
    
}