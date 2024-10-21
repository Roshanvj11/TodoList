import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../css/Login.css';





export default function Login() {
  const navigate = useNavigate();
  const handleClick = (navigationPage) => {
    navigate(navigationPage)
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('data', data)
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('Data posted in Login.js');
      // const dataValue = await response.json();
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/today')
      }
    } catch (error) {
      console.error("Error posting register:", error);
    }
  }

  return (
    <div className='Login'>

      <div className='LoginForm'>

        <div className='Loginhead'>
          <h1>Login</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='LoginForm'>

            <div className='LoginField'>
              <TextField id="standard-basic" label="Username" variant="standard"
                {...register('username', {
                  required: 'username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters long',
                  },
                })} />
              {errors.username && <p className='errorMsg' style={{ color: 'red' }}>{errors.username.message}</p>}
            </div>

            <div className='LoginField'>
              <TextField id="standard-basic" label="Password" type='password' variant="standard"
                {...register('password', {
                  required: 'password is required'
                })} />
              {errors.password && <p className='errorMsg' style={{ color: 'red' }}> {errors.password.message} </p>}
            </div>


          </div>

          <div className='LoginBtn'>
            <Button variant="contained" type='submit'>Login</Button>
          </div>

        </form>

        <div className='LoginNavigation'>
          <p>Not a Member ?<Button onClick={() => handleClick('/registor')} href="#text-buttons">Signup</Button></p>
        </div>

      </div>

    </div>
  )
}