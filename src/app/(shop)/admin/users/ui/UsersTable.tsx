'use client';
import { changeUserRole } from "@/actions";
import type { User } from "@/interfaces";


interface Props {
    users: User[];
}
export const UsersTable = ({users}:Props) => {
    
  return (
    <table className="min-w-full shadow-lg rounded-lg">
    <thead className="bg-purple-500 border-b text-white font-bold">
      <tr>
        <th scope="col" className="text-md font-bold px-6 py-4 text-left">
          #ID
        </th>
        <th scope="col" className="text-md font-bold  px-6 py-4 text-left">
        Full Name
        </th>
        <th scope="col" className="text-md font-bold  px-6 py-4 text-left">
        Email
        </th>
        <th scope="col" className="text-md font-bold  px-6 py-4 text-left">
          Role
        </th>
      
      </tr>
    </thead>
    <tbody>

      {
        users?.map( user => (
        
            <tr
            key={user!.id}
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-purple-100">

            <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-900 font-bold">{user!.id.split('-').at(-1)?.toUpperCase()}</td>
            <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
              {user!.firstName} {user!.lastName}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                {user!.email}
             
            </td>
            <td className="text-sm text-purple-900 font-light px-6 ">
                <select 
                    className="text-sm p-2 rounded text-purple-700 font-bold"
                    value={user.role}
                    onChange={ e => changeUserRole(user!.id, e.target.value)}
                >
                    <option className="" value="admin">Admin</option>
                    <option value="user">User</option>

                </select>
              
            </td>

          </tr>
        


        ))
      }

    </tbody>
  </table>
  
  )
}
