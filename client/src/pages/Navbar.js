import React from 'react'
import { Link } from 'react-router-dom';
import "../css/Navbar.css";


export default function Layout() {
    return (
        <div className="navbar" >

            <div className='navbarHead'>
                <p>logo</p>
                <h1>name</h1>
            </div>

            <div className='navbarLink'>
                <Link className='headLink' to='/today'>Today</Link>
                <Link className='headLink' to='/pending'>Pending</Link>
                <Link className='headLink' to='/scheduled'>Scheduled</Link>
            </div>

        </div>
    )
}
