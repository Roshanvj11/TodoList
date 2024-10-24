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
                <Link style={{textDecoration:'none'}} className='headLink' to='/today'> <TodayIcon id='navLogo1' sx={{fontSize:"30px"}} />Today </Link>
                <Link style={{textDecoration:'none'}} className='headLink' to='/scheduled'><EditCalendarIcon id='navLogo2' sx={{fontSize:"30px"}} />Scheduled </Link>
                <Link style={{textDecoration:'none'}} className='headLink' to='/pending'> <PendingActionsIcon id='navLogo3' sx={{fontSize:"30px"}} />Pending </Link>
            </div>

        </div>
    )
}
