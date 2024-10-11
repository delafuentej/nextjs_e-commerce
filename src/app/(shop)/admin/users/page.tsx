// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;
import { getPaginatedUsers } from '@/actions';
import { Pagination, Title } from '@/components';
import { UsersTable } from './ui/UsersTable';
import { redirect } from 'next/navigation';


interface Props {
  searchParams: {
    page?: string
  }
};

export default async function Users({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const {ok, users =[], totalPages} = await getPaginatedUsers({page});
  console.log('totalPagesXXx', totalPages)
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
        <Pagination totalPages={totalPages}/>
      </div>
    </>
  );
}