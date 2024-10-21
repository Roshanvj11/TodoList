import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import '../css/Pending.css'
import axios from 'axios';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Pending() {
  const [pendingData, setPendingData] = useState([]);
  //destructuring from userContext
  const { user } = useUserContext();

  // Safely destructuring user
  const id = user?.id;
  // const name = user?.name;
  // const email = user?.email;

  useEffect(() => {
    if (!user) {
      console.log("User is not available yet");
      return; // Exit early if user is null or undefined
    }

    const fetchTodayData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/getTodayData/${id}`)
        console.log('response.data', response.data)
        setPendingData(response.data)
      } catch (error) {
        console.error("Error getting data:", error);
      }
    }
    fetchTodayData();
  }, [user, id]);

  // console.log('id', id);

  console.log('pendingData', pendingData);

  // Get today's date formatted to YYYY-MM-DD
  const todayDate = new Date().toISOString().split('T')[0];
  console.log('todayDate', todayDate);

  const filteredPendingData = pendingData.filter((value) => {
    return value.status === 'pending';
    // && value.Date >= todayDate;
  });

  console.log('filteredPendingData:', filteredPendingData);

    //delete a task
    const handleDelete = async (id) => {
      console.log('deletingid', id)
      const removeTask = filteredPendingData.filter((todo) => {
        return todo._id !== id;
      })
      setPendingData(removeTask);
      try {
        const response = await axios.delete(`http://localhost:5000/api/user/deleteTask/${id}`);
        console.log('response.data', response.data)
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  

  return (
    <div className='pending'>

      <div>
        <h1>"Your Pending Tasks"</h1>
      </div>

      {filteredPendingData.length > 0 ? (
        filteredPendingData.map((value, index) => (
          <div className='pendingMappedList' key={index}>

            <div className='list one'>
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
              <p>{value.status}</p>
              <IconButton onClick={() => handleDelete(value._id)} sx={{ color: 'red' }} aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </div>

          </div>
        ))
      ) : (<div className='noTask'><p className='noPara'>No pending Tasks</p></div>)}


    </div>
  )
}
