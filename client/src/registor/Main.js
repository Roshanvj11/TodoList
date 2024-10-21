import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../css/Main.css'

import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';


export default function Main() {
  const navigate = useNavigate();
  const handleClick = (navigationPage) => {
    navigate(navigationPage)
  }
  return (
    <div className='main'>

      <div className='innerMain'>
        <div className='Mainhead'>
          <h1>
           <EditCalendarOutlinedIcon style={{ fontSize: 35,color:'yellow'}} /> Todo List
          </h1>
        </div>

        <div className='Mainbtn'>
          <Button onClick={() => handleClick('/login')} variant="contained">Login</Button>
          <h3>or</h3>
          <Button onClick={() => handleClick('/registor')} variant="contained">Sign up</Button>
        </div>
      </div>



    </div>
  )
}