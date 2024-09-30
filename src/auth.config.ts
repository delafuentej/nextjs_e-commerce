import NextAuth, {type NextAuthConfig} from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import {z} from 'zod';// validation scheme
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
import { AdapterUser } from 'next-auth/adapters';

 
export const authConfig : NextAuthConfig= {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    // const {token, user} = params
    jwt({token, user}){
      //console.log('callbacks-jwt', {token, user})
      if(user){
        token.data = user;
      }
      return token;
    },
    session({session, token, user}) {
     console.log('callbacks-session',{session, token, user})
     session.user = token.data as AdapterUser;
      return session;
    },
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
           // console.log('rest', {rest});
            return rest;
        }
    })
  ]
} 
//handlers => GET, POST Request => api/auth/[...nextauth]/route.js
export const {signIn, signOut, auth, handlers} = NextAuth(authConfig);