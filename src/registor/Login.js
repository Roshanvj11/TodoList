import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const navigate = useNavigate();
  const handleClick=(navigationPage)=>{
    navigate(navigationPage)
  }
  return (
    <div className='Login'>

      <div className='LoginForm'>

        <div>
          <h1>Login</h1>
        </div>

        <div>
          <TextField id="standard-basic" label="Email" variant="standard" />
          <TextField id="standard-basic" label="Password" variant="standard" />
          <p>Forgot Password ?</p>
        </div>

        <div>
          <Button variant="contained">Login</Button>
        </div>

        <div>
          <p>Not a Member ?<Button onClick={()=>handleClick('/registor')} href="#text-buttons">Signup</Button></p>
        </div>

      </div>

    </div>
  )
}
