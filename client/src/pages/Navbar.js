import React from 'react'
import { Link } from 'react-router-dom'


export default function Layout() {
    return (
        <div>

            <div>
                <p>logo</p>
                <h1>name</h1>
            </div>

            <div>
                <Link className='headLink' to='/today'>Today</Link>
                <Link className='headLink' to='/pending'>Pending</Link>
                <Link className='headLink' to='/scheduled'>Scheduled</Link>
            </div>

        </div>
    )
}
