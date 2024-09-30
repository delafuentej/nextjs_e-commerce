'use server';

import { signIn } from '@/auth.config';
//import { sleep } from '@/utils/sleep';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    //console.log({formData: Object.fromEntries(formData)})
    //await sleep(1)

    await signIn('credentials',{
      ...Object.fromEntries(formData),
      redirect: false
    });
    return 'Success';

  } catch (error) {
    console.log('error', error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}