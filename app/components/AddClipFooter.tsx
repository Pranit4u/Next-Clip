import React from 'react'

const AddClipFooter = ({ handleSave }: { handleSave: () => void}) => {
  return (
    <div className='flex justify-end'>
      <button className='p-1 rounded-sm hover:bg-gray-100 dark:hover:bg-slate-800 w-fit text-xs font-medium'
        onClick={() => handleSave()}
      >
        Save
      </button>
    </div>
  )
}

export default AddClipFooter