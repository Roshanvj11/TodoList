import React from 'react'
import { Link } from 'react-router-dom';
import "../css/Navbar.css";

import TodayIcon from '@mui/icons-material/Today';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PendingActionsIcon from '@mui/icons-material/PendingActions';


export default function Layout() {
    return (
        <div className="navbar" >

            <div className='navbarLink'>
                <Link style={{textDecoration:'none'}} className='headLink' to='/today'> <TodayIcon sx={{fontSize:"30px"}} />Today Task</Link>
                <Link style={{textDecoration:'none'}} className='headLink' to='/scheduled'><EditCalendarIcon sx={{fontSize:"30px"}} />Scheduled Task</Link>
                <Link style={{textDecoration:'none'}} className='headLink' to='/pending'> <PendingActionsIcon sx={{fontSize:"30px"}} />Pending Task</Link>
            </div>

        </div>
    )
}
