'use client'
import React, { useContext, useState } from 'react'
import { HiMiniMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import { SearchContext } from '../SearchContext'

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div className={`h-full mx-2 flex items-center rounded-md ${isFocused ? '' : 'bg-gray-100'} dark:${isFocused ? 'border border-slate-800' : 'bg-slate-800'}`}
      style={{ boxShadow: isFocused ? '0px 0px 1px 1px rgba(0,0,0,0.1)' : '' }}
    >
      <div className='h-full aspect-square text-gray-600 dark:text-slate-400 rounded-full flex justify-center items-center p-1'>
        <HiMiniMagnifyingGlass />
      </div>
      <input className='w-full h-full focus:outline-none text-xs bg-transparent'
        onChange={handleChange} value={searchQuery}
        placeholder='Search text or tag'
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className={`${searchQuery ? 'block' : 'hidden'} h-full cursor-pointer aspect-square text-gray-600 dark:text-slate-400 rounded-full flex justify-center items-center p-1`}
        onClick={() => setSearchQuery('')}
      >
        <HiOutlineXMark />
      </div>
    </div>
  )
}

export default Search   