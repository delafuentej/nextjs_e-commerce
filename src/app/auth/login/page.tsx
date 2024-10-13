import { titleFont } from '@/config/fonts';

import { LoginForm } from './ui/LoginForm';

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col bg-white p-6 shadow-2xl rounded-lg">
      <h1 className={ `${ titleFont.className } antialiased font-bold text-4xl mb-5 text-center` }>Login</h1>

      <LoginForm />
      </div>
    </div>
  );
}