import React, { useContext } from 'react'
import TooltipContent from './TooltipContent'
import { SearchContext } from '../SearchContext';

const AddClipFooter = ({ clipMaskText, setClipMaskText, handleSave, handleMaskInputKeyDown }: { clipMaskText: string, setClipMaskText: React.Dispatch<React.SetStateAction<string>>, handleSave: () => void, handleMaskInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }) => {
  const { tooltipObject, setTooltipObject } = useContext(SearchContext);
  
  return (
    <div className='flex justify-between items-center'
      data-tooltip-id='input-mask-tooltip'
    >
      <input className={`focus:outline-none py-2 font-medium min-w-20 w-full text-xs bg-transparent placeholder-gray-500`}
        style={{ resize: 'none', scrollbarWidth: 'none' }}
        placeholder='Add a mask'
        value={clipMaskText}
        name='clipMaskInput'
        onKeyDown={handleMaskInputKeyDown}
        onChange={(e) => setClipMaskText(e.target.value.trim())}
      />
      <button className='p-1 rounded-sm hover:bg-gray-100 dark:hover:bg-slate-800 w-fit text-xs font-medium'
        onClick={() => handleSave()}
      >
        Done
      </button>
      {tooltipObject.maskInput && 
        <TooltipContent id={'input-mask-tooltip'} data={'(Optional) Add a mask text to hide your clips. You will still be able to copy the clip as it is.'} place='bottom' 
          onNext={() => setTooltipObject({ ...tooltipObject, maskInput: false, clips: true })}/>}
    </div>
  )
}

export default AddClipFooter