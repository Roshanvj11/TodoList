import React from 'react';
import '../css/Head.css';
import Button from '@mui/material/Button';

import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


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
        <p>logo</p>
        <p>{user ? `${user.name}` : 'Loading user data...'}</p>
      </div>

      <div className='HeadBtn'>
        <Button variant="contained" onClick={handleClick}>
          Logout
        </Button>
      </div>

    </div>
  )
}
