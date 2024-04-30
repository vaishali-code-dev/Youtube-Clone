import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const isMenuOpen = useSelector(store => store.app.isMenuOpen)

    if (!isMenuOpen) return null;

    return (
        <div className='p-5 shadow-lg w-48'>
            <ul>
                < Link to={"/"}><li>Home</li></Link>
                <li>Shorts</li>
                <li>Videos</li>
                <li>Live</li>
            </ul>
            <h1 className='font-bold'>SUBSCRIPTION</h1>
            <ul>
                <li>Music</li>
                <li>Sports</li>
                <li>Games</li>
                <li>Movies</li>
            </ul>
            <h1 className='font-bold'>WATCH LATER</h1>
            <ul>
                <li>Music</li>
                <li>Sports</li>
                <li>Games</li>
                <li>Movies</li>
            </ul>
        </div>
    )
}

export default Sidebar