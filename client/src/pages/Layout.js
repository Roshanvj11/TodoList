import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import '../css/Layout.css';

export default function Layout() {
    return (
        <div >
            {/* <h1>hello</h1> */}
            <div className='Layout'>
                <Navbar />
                <main className='outlet'>
                    <Outlet /> {/* This will render the routed components like Home or About */}
                </main>
            </div>
        </div>
    )
}
