import React from 'react'
import { ClipInterface } from '../lib/utils/definition'
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2'
import { Menu, MenuItem } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { saveClips } from '../lib/features/clips/clipsSlice'
import { copyToClipboard } from '../lib/utils/helper'

const ClipItem = ({ clip, removeClip }: { clip: ClipInterface, removeClip: (clipID: string) => void }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const clips = useAppSelector(state => state.clips.value);
  const dispatch = useAppDispatch();

  const handleIconClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    removeClip(clip.id);
    handleClose();
  }

  const handlePin = () => {
    const updatedClip = {
      ...clip,
      pinned: !clip.pinned,
    }
    const updatedClips = clips.map(c => c.id === clip.id ? updatedClip : c);
    setAnchorEl(null);
    dispatch(saveClips(updatedClips));
    localStorage.setItem('clips', JSON.stringify(updatedClips));
  }

  const enoughSpaceBelow = () => {
    if (!anchorEl) return false;
    const anchorRect = anchorEl.getBoundingClientRect();
    return window.innerHeight - anchorRect.bottom > 200;
  };

  return (
    <div className={`relative border border-gray-300 dark:border-slate-700 border-1 rounded-md my-1 cursor-pointer hover:border-gray-700 dark:hover:border-slate-400 hover:shadow-lg active:bg-gray-100 dark:active:bg-slate-600`}>
      <div className='p-2'
        onClick={() => copyToClipboard(clip.text)}
      >
        {clip.text}
      </div>
      <div className='absolute right-0 top-0'>
        <div className='rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 p-1'
          onClick={handleIconClick}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <HiMiniEllipsisHorizontal />
        </div>
        <Menu
          id="basic-menu" 
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: enoughSpaceBelow() ? 'bottom' : 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: enoughSpaceBelow() ? 'top' : 'bottom',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handlePin}>
            <label className='text-xs'>{clip.pinned ? 'Unpin' : 'Pin'}</label>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <label className='text-xs'>Delete</label>
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default ClipItem