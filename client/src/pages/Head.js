import React from 'react';
import '../css/Head.css';
import Button from '@mui/material/Button';

import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Head() {
  const navigate = useNavigate();
  //destructuring from userContext
  const { user } = useUserContext();
  // console.log('user head', user)

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/TodoList')
    window.location.reload();  // Forces a full page reload

  }

  return (
    <div className='Head'>

      <div className='HeadName'>
        <AccountCircleIcon className='HeadLogo' style={{
          fontSize:'50px',
          backgroundColor:'white',
          borderRadius:'50px',
          color:'#6256CA'}}/>
        <p>{user ? `${user.name}` : 'Loading ..'}</p>
      </div>

      <div className='HeadBtn'>
        <Button variant="contained" onClick={handleClick}>
          <LogoutIcon id='Logout'/> Logout
        </Button>
      </div>

    </div>
  )
}
