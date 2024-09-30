import NextAuth, {type NextAuthConfig} from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import {z} from 'zod';// validation scheme
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';

 
export const authConfig : NextAuthConfig= {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    Credentials({
        async authorize(credentials){
            const parsedCredentials = z
            .object({ 
                email: z.string().email(),
                password: z.string().min(6)  
            })
            .safeParse(credentials);

            console.log('parsedCredentials.success', parsedCredentials.success)

            if( !parsedCredentials.success) return null;


            const { email, password } = parsedCredentials.data;

            //console.log('authConfig',{email, password});

            // search the email
            const user = await prisma.user.findUnique({
              where: {email: email.toLocaleLowerCase()}
            });

            if(!user) return null;
             // compare the passwords
            if(!bcryptjs.compareSync(password, user.password)) return null;

            //return the user
            //  to not send the password in http requests :  const {password: _, ...rest} = user;
            const {password: _, ...rest} = user;
            console.log('rest', {rest});
            return rest;
        }
    })
  ]
} 

export const {signIn, signOut, auth} = NextAuth(authConfig);