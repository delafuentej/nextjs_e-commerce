import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";



export default async function Profile() {

    const session = await auth();

    if(!session?.user){
        //redirect('/auth/login?returnTo=/profile');
        redirect('/')
    };

  return (
    <div>
     <Title 
        title='Profile'
     />
     <pre>
        { JSON.stringify(session.user, null, 2)}
     </pre>
     <h4 className="text-xl">{session.user.role}</h4>
    
    </div>
  );
}