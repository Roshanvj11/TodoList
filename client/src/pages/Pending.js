import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';



export default function Pending() {
  const [pendingData , setPendingData ] = useState([]);
  //destructuring from userContext
  const { user } = useUserContext();

  // Safely destructuring user
  const id = user?.id;
  // const name = user?.name;
  // const email = user?.email;

  useEffect (() => {
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

  console.log('pendingData', pendingData)

  const filteredPendingData = pendingData.filter((value)=>{
    return value.status === 'pending' ;
  });

  console.log('filteredPendingData:', filteredPendingData)

  return (
    <div>
      <div>
        <h2>"Your Pending Tasks"</h2>
      </div>
    </div>
  )
}
