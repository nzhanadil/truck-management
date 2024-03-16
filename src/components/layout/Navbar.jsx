import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, IconButton } from '@mui/material';

const Navbar = () => {
  const {pathname} = useLocation()
  const [isOpen, setIsOpen] = useState(true)
  const [activeMenu, setActiveMenu] = useState(pathname.split("/")[1])
  const [screenSize, setScreenSize] = useState(undefined)

  useEffect(() => {
    const handleRezise = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleRezise)
    handleRezise();
    return () => window.removeEventListener('resize', handleRezise)
  }, [])

  useEffect(() => {
    if(screenSize <= 767) setIsOpen(false)
    else setIsOpen(true)
  }, [screenSize])

  const handleClick = (menuOption) => {
    setActiveMenu(menuOption.toLowerCase())
    if(screenSize<=767) setIsOpen(false)
  }

  const menuOptions = ['Dashboard', 'Management', 'Drivers', 'Trucks', 'Trailers']

  return (
    <div>
      {!isOpen && <div className='fixed top-3 left-3 rounded-full bg-teal-900'>
        <IconButton onClick={() => setIsOpen(true)}>
          <MenuIcon className='text-white' />
        </IconButton>
      </div>
      }
      {isOpen && 
      <div className={`${screenSize <= 767 ? 'w-[100vw]' : 'w-64'} relative border-2 border-teal-900 h-[100vh] flex flex-col justify-between`}>
        <div>
            <div className='relative text-white bg-teal-900 p-3 w-full flex justify-between'>
                <Link to="/" className='text-2xl' onClick={() => handleClick('')}>
                    <span className=' border-2 border-white px-1'>Truck</span>
                    <span className='bg-white px-1 text-teal-900 font-bold py-0.5'>East</span>
                </Link>

                <IconButton className='absolute -right-1 -top-1' onClick={() => setIsOpen(false)}>
                    <CloseIcon className='text-white'/> 
                </IconButton>
            </div>

            <div className='flex flex-col text-teal-900 text-lg p-3 gap-3'>
                {menuOptions.map((menuOption, index) => (
                    <Link 
                    to={`/${menuOption.toLowerCase()}`}
                    className={`${activeMenu===menuOption.toLowerCase() && 'bg-teal-900 text-white'} px-4 py-2 hover:bg-teal-700 hover:text-white hover:duration-150 rounded-lg`}
                    onClick={() => handleClick(menuOption)}
                    >
                    {/* Icons for each menu */}
                    {menuOption}
                    </Link>
                ))}
            </div>
        </div>
            
        <div className='flex bg-teal-900 p-3 justify-between'>
            <div className='flex'>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <div className='text-white ml-3'>
                    <p className='font-bold'>Full Name</p>
                    <p>Role</p>
                </div>
            </div>
            <IconButton>
                <SettingsIcon className='text-white'/>
            </IconButton>
        </div>
      </div>}
    </div>
  )
}

export default Navbar
