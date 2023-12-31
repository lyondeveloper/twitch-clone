import React from 'react'
import { Logo } from './logo'
import { SearchBar } from './search'
import { Actions } from './actions'

export const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full h-20 z-[49] bg-[#252631] px-2 lg:p-4 flex justify-between items-center shadow-sm'>
      <Logo />
      <SearchBar />
      <Actions />
    </nav>
  )
}
