import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div>
            <div>
                <Navbar />
                <main>
                    <Outlet /> {/* This will render the routed components like Home or About */}
                </main>
            </div>
        </div>
    )
}
