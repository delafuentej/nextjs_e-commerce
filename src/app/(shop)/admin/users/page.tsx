// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { getPaginatedUsers } from '@/actions';
import { Pagination, Title } from '@/components';
import { UsersTable } from './ui/UsersTable';
import { redirect } from 'next/navigation';



export default async function Users() {

  const {ok, users =[]} = await getPaginatedUsers();

  if(!ok){
    redirect('/auth/login');
  }
 
 
  return (
    <>
      <Title title="Users-Admin: Maintenance" />
     
      <div className="mb-10">
        <UsersTable 
        users={users}
        />
        <Pagination totalPages={1}/>
      </div>
    </>
  );
}