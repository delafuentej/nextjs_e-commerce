import Link from "next/link";


interface Props {
    href: string;
    label: string;
    icon: React.ComponentType<{size: number}>;
}

export const SidebarItem = ({href, label, icon: Icon}: Props) => {
  return (
    <Link
    href={href}
    className='flex items-center mt-10 p-2 hover:bg-purple-200 rounded transition-all'
  >
    <Icon size={30} />
    <span className='text-xl ml-3'>{label}</span>
  </Link>
  )
}
