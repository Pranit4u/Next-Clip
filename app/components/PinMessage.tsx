import React from 'react'

const PinMessage = ({msg}: {msg: string}) => {
  return (
    <div className='flex items-center text-xs font-medium text-gray-500 dark:text-slate-400 gap-2'>
      <div className='flex-1 bg-gray-200 dark:bg-slate-500' style={{height: 1}}></div>
      <label>{msg}</label>
      <div className='flex-1 bg-gray-200 dark:bg-slate-500' style={{height: 1}}></div>
    </div>
  )
}

export default PinMessage