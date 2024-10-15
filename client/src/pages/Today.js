import React, { useEffect, useState } from 'react';
import '../css/Today.css';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { useUserContext } from '../context/UserContext';
import axios from 'axios';

export default function Today() {
  const [open, setOpen] = useState(false);
  const { user } = useUserContext();

  // Safely destructuring user
  const id = user?.id;
  const name = user?.name;
  const email = user?.email;

  console.log('id', id)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log('Closing action executed');
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const data = {
      userId: id,
      userName: name,
      userEmail: email,
      Task: formJson.Task,
      TaskDate: formJson.date,
      Time: formJson.time,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/user/TodayData', data);
      if (response.status === 200) {
        console.log('Response:', response);
        setOpen(false); // Check if the dialog closes only on successful response
      } else {
        console.log('Failed to submit data', response);
      }// Try calling setOpen directly here to close the dialog
    } catch (error) {
      console.error("Error in posting todayData", error);
    }
  };

  // Get today's date formatted to YYYY-MM-DD
  const formattedDate = new Date().toISOString().split('T')[0];

  useEffect (()=>{
    if (!user) {
      console.log("User is not available yet");
      return; // Exit early if user is null or undefined
    }
    
    const fetchTodayData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/getTodayData/${id}`)
        console.log('response.data', response.data)
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }
    fetchTodayData();
  },[user, id,handleSubmit])

  return (
    <div className='today'>
      <h2>Today main focus</h2>
      <div className='HeadBtn'>
        <Button aria-hidden="true" variant="outlined" onClick={handleClickOpen}>
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
          <DialogTitle>Add Your Today's Task Here</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details of the task you want to add for today. Make sure to include all relevant information so you can stay organized and on track!
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
              focused
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
              value={formattedDate}
              focused
              readOnly
            // Optionally allow editing for testing
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
              focused
            />
          </DialogContent>
          <DialogActions>
            <Button aria-hidden="true" onClick={handleClose}>Cancel</Button>
            <Button aria-hidden="true" type="submit">Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
