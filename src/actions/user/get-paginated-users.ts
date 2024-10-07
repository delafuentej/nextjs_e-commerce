'use server';

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
export const getPaginatedUsers = async() => {

    const session = await auth();

    if(session?.user.role !== 'admin'){
        return {
            ok:false,
            message:'User must be administrator'
        }
    };

    const users = await prisma.user.findMany({
        orderBy: {
            firstName:'desc'
        }
    });
    return {
        ok:true,
        users: users,
    }
    
}