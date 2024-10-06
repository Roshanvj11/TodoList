import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



export default function Registor() {
  const navigate = useNavigate();
  const handleClick = (navigationPage) => {
    navigate(navigationPage)
  }
  return (
    <div className='Registor'>

      <div className='RegistorForm'>

        <div>
          <h1>Sign Up</h1>
        </div>

        <div>
          <TextField id="standard-basic" label="Email" variant="standard" />
          <TextField id="standard-basic" label="Password" variant="standard" />
          <TextField id="standard-basic" label="Confirm Password" variant="standard" />
        </div>

        <div>
          <Button variant="contained" onClick={() => handleClick('/login')}>Sign Up</Button>
        </div>

        <div>
          <p>Already Have an Account ? <Button onClick={() => handleClick('/login')} href="#text-buttons">Login</Button></p>
        </div>


      </div>

    </div>
  )
}
