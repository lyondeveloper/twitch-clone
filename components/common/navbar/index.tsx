import { Logo } from './logo';
import { SearchBar } from './search';
import { Actions } from './actions';

interface NavbarProps {
  withSearchBar: boolean;
  title: string;
  subtitle: string;
  actionTitle: string;
  actionHref: string;
}

export const Navbar = ({ withSearchBar = false, title, subtitle, actionHref, actionTitle }: NavbarProps) => {
  return (
    <nav className='fixed top-0 w-full h-20 z-[49] bg-[#252631] px-2 lg:p-4 flex justify-between items-center shadow-sm'>
      <Logo title={title} subtitle={subtitle} />
      {withSearchBar && (
        <SearchBar />
      )}
      <Actions actionTitle={actionTitle} actionHref={actionHref} />
    </nav>
  )
}
