import React from 'react';
import { useState, useEffect } from 'react';
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

// import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { io } from 'socket.io-client';
import UpdateScheduled from './UpdateScheduled';



export default function Scheduled() {

  const [sheduledDate, setSheduledDate] = useState([]);

  //Todo button with Dialog 
  const [open, setOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

// Function to get tomorrow's date in YYYY-MM-DD format
const getTomorrowDate = () => {
  const now = new Date();

    // Calculate tomorrow's date
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30 in milliseconds
    const tomorrow = new Date(now.getTime() + istOffset); // Adjust to IST
    tomorrow.setDate(tomorrow.getDate() + 1); // Add one day

    // Format as YYYY-MM-DD
    return tomorrow.toISOString().split('T')[0]; 
};

console.log('getTomorrowDate()', getTomorrowDate())

  //destructuring from userContext
  const { user } = useUserContext();
  const socket = io('http://localhost:5000')


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
  const today = new Date();
  const todayDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');  console.log('formattedDate', formattedDate)
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
    //socket.IO setup to listen for real-time updates
    socket.on('todayData', (newData) => {
      console.log('new data received', newData);
      setSheduledDate((prevData) => [...prevData, newData])
    })

    return () => {
      socket.off('newTodayData');
    };
    // eslint-disable-next-line
  }, [user, id])

  //delete a task
  const handleDelete = async (id) => {
    console.log('deletingid', id)
    const removeTask = filteredScheduledDate.filter((todo) => {
      return todo._id !== id;
    })
    setSheduledDate(removeTask);
    try {
      const response = await axios.delete(`http://localhost:5000/api/user/deleteTask/${id}`);
      console.log('response.data', response.data)
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  return (
    <div className='scheduled'>

      <div className='scheduledHead'>


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


      {filteredScheduledDate.length > 0 ? (
        filteredScheduledDate.map((value, index) => (
          <div className='todayMappedList' key={index}>

            <div className='list one'>
              {/* <Checkbox
                checked={value.status === 'finished'}
                onChange={(event) => handleStatusChange(event, value._id)}
                sx={{
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                }}
              /> */}
              <p className='dot'></p>
              <p>{value.Task}</p>
            </div>

            <div className='list two'>
              <p>{value.Date && (() => {
                const date = new Date(value.Date); // Convert database date string to Date object
                const day = date.getDate();
                const month = date.getMonth() + 1; // Months are zero-based, so add 1
                const year = date.getFullYear();

                return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
              })()}
              </p>
              <p>{value.Time}</p>
              <UpdateScheduled id={value._id} />

              <IconButton onClick={() => handleDelete(value._id)} sx={{ color: 'red' }} aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>

          </div>
        ))
      ) : (<div><p>Today no task left</p></div>)}


    </div>
  )
}
