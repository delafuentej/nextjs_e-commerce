import NextAuth, {type NextAuthConfig} from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import {z} from 'zod';// validation scheme
 
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

            if( !parsedCredentials.success) return null;

            const { email, password } = parsedCredentials.data;

            console.log({email, password});
            // search the email

            // compare the passwords

            //return the user
        }
    })
  ]
} 

export const {signIn, signOut, auth: middleware} = NextAuth(authConfig);