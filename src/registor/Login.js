import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';



export default function Login() {
  const navigate = useNavigate();
  const handleClick = (navigationPage) => {
    navigate(navigationPage)
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('data', data)
  }

  return (
    <div className='Login'>

      <div className='LoginForm'>

        <div>
          <h1>Login</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>

            <div>
              <TextField id="standard-basic" label="Email" variant="standard"
                {...register('email', {
                  required: 'email is required',
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: 'email is not valid'
                  }
                })} />
              {errors.email && <p className='errorMsg' style={{ color: 'red' }}>{errors.email.message}</p>}
            </div>

            <div>
              <TextField id="standard-basic" label="Password" variant="standard"
                {...register('password', {
                  required: 'password is required'
                })} />
              {errors.password && <p className='errorMsg' style={{ color: 'red' }}> {errors.password.message} </p>}
            </div>


          </div>

          <div>
            <Button variant="contained" type='submit'>Login</Button>
          </div>

        </form>

        <div>
          <p>Not a Member ?<Button onClick={() => handleClick('/registor')} href="#text-buttons">Signup</Button></p>
        </div>

      </div>

    </div>
  )
}
