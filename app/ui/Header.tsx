import React from 'react'
import { HiArrowPath, HiMiniBars3, HiOutlineCog6Tooth, HiOutlineUser } from 'react-icons/hi2'
import Search from '../components/Search'

const Header = () => {
  return (
    <div className='flex text-black items-center'>
      <HiMiniBars3 />
      <Search />
      <HiArrowPath />
      <HiOutlineCog6Tooth />
      <HiOutlineUser />
    </div>
  )
}

export default Header