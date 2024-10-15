import React from 'react';
import  { useState, useEffect } from 'react';
import '../css/scheduled.css';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


import { useUserContext } from '../context/UserContext';
import axios from 'axios';

export default function Scheduled() {

  const [sheduledDate, setSheduledDate] = useState([]);

  //Todo button with Dialog 
  const [open, setOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  // Function to get tomorrow's date in YYYY-MM-DD format
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };
  //destructuring from userContext
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
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    // const Task = formJson.Task;
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
  }

  console.log('sheduledDate', sheduledDate);
  // Get today's date formatted to YYYY-MM-DD
  const todayDate = new Date().toISOString().split('T')[0];
  console.log('todayDate', todayDate);
  
  const filteredScheduledDate = sheduledDate.filter((value) => {
    return value.Date > todayDate
  })
  console.log('filteredScheduledDate', filteredScheduledDate)

  useEffect(() => {
    if (!user) {
      console.log("User is not available yet");
      return; // Exit early if user is null or undefined
    }

    const fetchTodayData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/getTodayData/${id}`)
        console.log('response.data', response.data)
        setSheduledDate(response.data);
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }
    fetchTodayData();
  }, [user, id])

  return (
    <div className='scheduled'>

      <div>
        <h2>"Plan Your Future Tasks"</h2>
      </div>

      <div className='HeadBtn'>
        <React.Fragment>
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
            <DialogTitle>Add Your Scheduled Task Here</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the details of the scheduled task you want to add for future days. Make sure to include all relevant information to stay organized and on track!
              </DialogContentText>
              <br></br>
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
                value={formattedDate} // Controlled input
                onChange={(e) => setFormattedDate(e.target.value)} // Handle date change
                focused={true}
                inputProps={{
                  min: getTomorrowDate(), // Set min to tomorrow's date
                }}
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
