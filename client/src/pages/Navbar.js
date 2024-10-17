import React from 'react'
import { Link } from 'react-router-dom';
import "../css/Navbar.css";


export default function Layout() {
    return (
        <div className="navbar" >

            <div className='navbarLink'>
                <Link className='headLink' to='/today'>Today Task</Link>
                <Link className='headLink' to='/scheduled'>Scheduled Task</Link>
                <Link className='headLink' to='/pending'>Pending Task</Link>
            </div>

        </div>
    )
}
