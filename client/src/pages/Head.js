import React, { useState } from 'react';
import '../css/Head.css';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useUserContext } from '../context/UserContext';


export default function Head() {
  //Todo button with Dialog 
  const [open, setOpen] = useState(false);

  //destructuring from userContext
  const {user} = useUserContext();
  console.log('user head', user)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const Task = formJson.Task;
    console.log(formJson)
    console.log(Task);
    handleClose();
  }

  return (
    <div className='Head'>

      <div className='HeadName'>
        <p>logo</p>
      <p>{user ? `${user.name}` : 'Loading user data...'}</p>
      </div>

      <div className='HeadBtn'>
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Todo
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmit
            }}
          >
            <DialogTitle>Add Task Here</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add your to-do task here. Stay organized by keeping track of your tasks easily.

              </DialogContentText>

              <TextField
                autoFocus
                required
                margin="dense"
                id="Task"
                name="Task"
                label="Add Task"
                fullWidth
                variant="outlined"
                focused={true}                
                />
              <TextField
                required
                margin="dense"
                id="date"
                name="date"
                label="Date"
                type="date"
                fullWidth
                variant="outlined"
                focused={true}  
              />
              <TextField
                required
                margin="dense"
                id="time"
                name="time"
                label="Time"
                type="time"
                fullWidth
                variant="outlined" 
                focused={true} 
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">submit</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>

    </div>
  )
}
