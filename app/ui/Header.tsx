import React, { useContext } from 'react'
import { HiMiniBars3, HiOutlineCog6Tooth, HiMiniArrowPath } from 'react-icons/hi2'
import Search from '../components/Search'
import { SearchContext } from '../SearchContext';
import { Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../lib/hooks';
import { saveClips } from '../lib/features/clips/clipsSlice';
import { saveLabels } from '../lib/features/labels/labelsSlice';
import TooltipContent from '../components/TooltipContent';

const Header = () => {
  const { setShowLabelMenu, darkMode, setDarkMode, tooltipObject, setTooltipObject } = useContext(SearchContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const handleSettingClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRefresh = () => {
    window.location.reload();
  }

  const handleSwitchMode = () => {
    if (darkMode) {
      setDarkMode(false);
      localStorage.setItem('darkMode', '');
    } else {
      setDarkMode(true);
      localStorage.setItem('darkMode', 'true');
    }
    handleClose();
  }

  const finishTooltip = () => {
    setTooltipObject(prev => ({ ...prev, refresh: false }));
    localStorage.setItem('tooltipShown', 'true');
  }

  const handleClearAll = () => {
    dispatch(saveClips([]));
    dispatch(saveLabels([]));
    localStorage.setItem('clips', JSON.stringify([]));
    localStorage.setItem('labels', JSON.stringify([]));
    handleClose();
  }

  const handleShowTooltip = () => {
    setTooltipObject(prev => ({ ...prev, clipInput: true }));
    handleClose();
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='flex justify-between p-2 h-12 text-black dark:text-slate-400 items-center'
      style={{ borderBottom: '1px solid rgb(0, 0, 0, 0.1)' }}
    >
      <div className='h-full aspect-square rounded-full text-gray-600 dark:text-slate-400 dark:hover:bg-slate-800 hover:bg-gray-100 cursor-pointer flex justify-center items-center'
        onClick={() => setShowLabelMenu(prev => !prev)}
        data-tooltip-id='label-option-tooltip'
      >
        <HiMiniBars3 />
        {tooltipObject.labelOption && 
          <TooltipContent id='label-option-tooltip' data='Find all of your added labels heres. Click them to filter out clips.' place='right' 
            onNext={() => setTooltipObject(prev => ({ ...prev, labelOption: false, search: true }))}/>}
      </div>
      <Search />
      <div className='h-full aspect-square rounded-full text-gray-600 dark:text-slate-400 dark:hover:bg-slate-800 hover:bg-gray-100 cursor-pointer flex justify-center items-center'
        onClick={handleRefresh}
        data-tooltip-id='reload-tooltip'
      >
        <HiMiniArrowPath />
        {tooltipObject.refresh && 
          <TooltipContent id='reload-tooltip' data='Refresh the tab.' place='left-start' buttonText='Finish' 
            onNext={finishTooltip}/>}
      </div>
      <div className='h-full aspect-square rounded-full text-gray-600 dark:text-slate-400 dark:hover:bg-slate-800 hover:bg-gray-100 cursor-pointer flex justify-center items-center'
        onClick={handleSettingClick}
        id='theme-icon'
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        data-tooltip-id='setting-tooltip'
      >
        <HiOutlineCog6Tooth />
        {tooltipObject.setting && 
          <TooltipContent id='setting-tooltip' data='Quick handy settings.' place='left-start'
            onNext={() => setTooltipObject(prev => ({ ...prev, setting: false, refresh: true }))}/>}
      </div>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-icon',
        }}
      >
        <MenuItem onClick={handleSwitchMode} style={{ height: 'fit-content' }}>
          <label className='text-xs cursor-pointer'>{darkMode ? 'Light Mode' : 'Dark Mode'}</label>
        </MenuItem>
        <MenuItem onClick={handleClearAll} style={{ height: 'fit-content' }}>
          <label className='text-xs cursor-pointer'>Clear all</label>
        </MenuItem>
        <MenuItem onClick={handleShowTooltip} style={{ height: 'fit-content' }}>
          <label className='text-xs cursor-pointer'>How to use</label>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Header