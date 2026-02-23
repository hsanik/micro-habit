import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <nav className="p-4 bg-gray-100 flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/habits">All Habits</Link>
            <Link to="/habits/add">Add Habit</Link>
            <Link to="/my-habits">My Habits</Link>
            <Link to="/auth/login">Login</Link>
        </nav>
    );
};

export default Navbar;
