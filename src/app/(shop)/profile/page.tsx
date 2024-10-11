import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ProfileItem } from "./ui/ProfileItem";



export default async function Profile() {

    const session = await auth();
    console.log('sesion_123', session)

    console.log('session123', session)

    if(!session?.user){
        //redirect('/auth/login?returnTo=/profile');
        redirect('/')
    };

  return (
    <div>
     <Title 
        title='Profile'
     />
     <hr />
     <div className="flex flex-col md:flex-row mt-24 justify-evenly items-center ">
       <Image 
       className="rounded-full mb-24 justify-center"
       src={session.user.image ?? '/imgs/profile.jpg'}
       width={300}
       height={300}
       alt='Foto user'
       />

       <div className="flex flex-col justify-center align-top h-100">

        <ProfileItem 
        label='User-Id'
        info= {session.user?.id.split('-').at(-1) ?? 'No UserId'}
        />
        
        <ProfileItem 
        label='Name'
        info= {`${session.user!.firstName} ${session.user?.lastName}`}
        />

        <ProfileItem 
        label='E-Mail'
        info= {session.user?.email ?? 'No Email'}
        />

      <ProfileItem 
        label='Roles'
        info= {session.user.role.toLocaleUpperCase().at(0) + session.user.role.slice(1)}
        />

       </div>
       

      </div>
    
    </div>
  );
}