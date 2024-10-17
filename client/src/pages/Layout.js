import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import '../css/Layout.css';
import Head from './Head';
import Footer from './Footer';

export default function Layout() {
    return (
        <div >
            <Head />
            <div className='Layout'>
                <Navbar />
                <main className='outlet'>
                    <Outlet /> {/* This will render the routed components like Home or About */}
                </main>
            </div>
            <Footer/>
        </div>
    )
}
