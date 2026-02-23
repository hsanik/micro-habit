import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="p-4 text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <Link to="/" className="text-blue-500 underline">Go back home</Link>
        </div>
    );
};

export default NotFound;
