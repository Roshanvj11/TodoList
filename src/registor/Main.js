import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



export default function Main() {
  const navigate = useNavigate();
  const handleClick=(navigationPage)=>{
    navigate(navigationPage)
  }
  return (
    <div>

        <div>
        <h1>
            Todo List
        </h1>
        </div>

        <div>
        <Button onClick={()=>handleClick('/login')} variant="contained">Login</Button>
        <h3>or</h3>
        <Button onClick={()=>handleClick('/registor')} variant="contained">Sign up</Button>
        </div>

    </div>
  )
}
