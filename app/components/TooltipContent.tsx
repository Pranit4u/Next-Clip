import React from 'react'
import { PlacesType, Tooltip } from 'react-tooltip'

const TooltipContent = ({ id, data, place, onNext, buttonText='Next' }: { id: string, data: string, place: PlacesType, onNext: () => void, buttonText?: string }) => {
  return (
    <Tooltip id={id}
      isOpen={true}
      className='text-xs z-10'
      place={place}
      clickable={true}
    >
      <div className='text-xs' style={{ maxWidth: '200px' }}>
        {data}
      </div>
      <div className='flex justify-end'>
        <button className='border text-xs border-1 rounded-full px-1 cursor-pointer'
          onClick={() => onNext()}
        >
          {buttonText}
        </button>
      </div>
    </Tooltip>
  )
}

export default TooltipContent