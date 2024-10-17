import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import '../css/Pending.css'
import axios from 'axios';


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
    return value.status === 'pending' && value.Date >= todayDate;
  });

  console.log('filteredPendingData:', filteredPendingData)

  return (
    <div className='pending'>

      <div>
        <h2>"Your Pending Tasks"</h2>
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
            </div>

          </div>
        ))
      ) : (<div><p>Today no task left</p></div>)}


    </div>
  )
}
