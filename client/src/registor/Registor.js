import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';



export default function Registor() {

  const navigate = useNavigate();
  const handleClick = (navigationPage) => {
    navigate(navigationPage)
  }

  const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm();


  const onSubmit = async (data) => {
    console.log('data', data);
    try {
      await axios.post('http://localhost:5000/api/user/router', data);
      console.log('Data post successful (register)');
      reset(); // Assuming reset is a form reset function
      alert('Sign Up successfully')
      handleClick('/login');
    } catch (error) {
      console.error("Error posting register:", error);
    }
  };


  return (
    <div className='Registor'>

      <div className='RegistorForm'>

        <div>
          <h1>Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>

            <div>
              <TextField id="standard-basic" label="Username" variant="standard"
                {...register('username', {
                  required: 'Username is required',
                  pattern: {
                    message: 'Username is not valid'
                  }
                })} />
              {errors.email && <p className='errorMsg' style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
              <TextField id="standard-basic" label="Email" variant="standard"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'Email is not valid'
                  }
                })} />
              {errors.email && <p className='errorMsg' style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
              <TextField id="standard-basic" label="Password" variant="standard"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: "password should be at-least 8 characters."
                  }
                })} />
              {errors.password && <p className='errorMsg' style={{ color: 'red' }}>{errors.password.message}</p>}
            </div>

            <div>
              <TextField id="standard-basic" label="Confirm Password" variant="standard"
                {...register('confirmPassword', {
                  required: 'confirmPassword is required',
                  minLength: {
                    value: 8,
                    message: "password should be at-least 8 characters."
                  },
                  validate: (value) => value === getValues('password') || 'Passwords do not match'
                })} />
              {errors.confirmPassword && <p className='errorMsg' style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}
            </div>

          </div>

          <div>
            <Button variant="contained" type='submit'>Sign Up</Button>
          </div>
        </form>

        <div>
          <p>Already Have an Account ? <Button onClick={() => handleClick('/login')} href="#text-buttons">Login</Button></p>
        </div>


      </div>

    </div>
  )
}