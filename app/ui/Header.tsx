import React, { useContext } from 'react'
import { HiMiniBars3, HiOutlineCog6Tooth } from 'react-icons/hi2'
import Search from '../components/Search'
import { SearchContext } from '../SearchContext';
import { Menu, MenuItem } from '@mui/material';

const Header = () => {
  const { setShowLabelMenu, darkMode, setDarkMode } = useContext(SearchContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);;

  const handleIconClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='flex justify-between p-2 h-12 text-black dark:text-slate-400 items-center'
      style={{ borderBottom: '1px solid rgb(0, 0, 0, 0.1)' }}
    >
      <div className='h-full aspect-square rounded-full text-gray-600 dark:text-slate-400 dark:hover:bg-slate-800 hover:bg-gray-100 cursor-pointer flex justify-center items-center'
        onClick={() => setShowLabelMenu(prev => !prev)}
      >
        <HiMiniBars3 />
      </div>
      <Search />
      <div className='h-full aspect-square rounded-full text-gray-600 dark:text-slate-400 dark:hover:bg-slate-800 hover:bg-gray-100 cursor-pointer flex justify-center items-center'
        onClick={handleIconClick}
        id='theme-icon'
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <HiOutlineCog6Tooth />
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
        <MenuItem>
          <label className='text-xs cursor-pointer' onClick={handleSwitchMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</label>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default Header