'use client';
import { useUIStore } from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { IoSearch} from 'react-icons/io5';

interface FormInputs {
  search: string;
}

interface Params {
  keep?: boolean;
}

export const SearchInput: FC<Params> = ({ keep = false }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const closeSideMenu = useUIStore((state) => state.closeSidebar);
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: {
      search: searchParams.get('q') ?? '',
    },
  });

  const onSubmit = (data: FormInputs) => {
    const search = data.search;
    closeSideMenu();
    if (!keep) reset();
    router.push(`/search?q=${search}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-0 sm:gap-3 w-full flex-wrap relative"
    >
     
      <input
        type="search"
        placeholder="Search"
        className=" bg-purple-100 sm:rounded pl-10 py-1 pr-3 border-b-2 text-xl border-purple-200 focus:border-purple-500"
        {...register('search', { required: true })}
      />
      <button className="btn btn-primary"> <IoSearch size={25} className="" /></button>
    </form>
  );
};