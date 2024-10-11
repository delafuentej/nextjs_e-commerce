
import { titleFont } from '@/config/fonts';

import { RegisterForm } from './ui/RegisterForm';

export default function NewAccount() {
   return (
    <div className="flex flex-col justify-center items-center min-h-screen">
       <div className="flex flex-col bg-white p-6 shadow-2xl rounded-lg">
      <h1 className={ `${ titleFont.className } text-4xl mb-5 text-center` }>New Account</h1>

      <RegisterForm />
      </div>
    </div>
  );
}