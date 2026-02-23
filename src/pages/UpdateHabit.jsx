import React from 'react';
import { useParams } from 'react-router';

const UpdateHabit = () => {
    const { id } = useParams();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Update Habit</h1>
            <p>Form to update habit ID: {id}</p>
        </div>
    );
};

export default UpdateHabit;
