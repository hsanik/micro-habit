import React from 'react';
import { useParams } from 'react-router';

const HabitDetails = () => {
    const { id } = useParams();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Habit Details</h1>
            <p>Details for habit ID: {id}</p>
        </div>
    );
};

export default HabitDetails;
