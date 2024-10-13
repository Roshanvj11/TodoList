import React from 'react';
import '../css/Head.css';
import Button from '@mui/material/Button';


export default function Head() {
  return (
    <div className='Head'>

      <div className='HeadName'>
        <p>logo</p>
        <h1>name</h1>
      </div>

      <div className='HeadBtn'>
      <Button variant="contained" >Add Todo</Button>
      </div>

    </div>
  )
}
