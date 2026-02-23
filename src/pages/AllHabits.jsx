import React, { useState, useEffect } from 'react';
import HabitCard from '../components/HabitCard';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router';
import { Plus, Users, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AllHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/habits`)
            .then(res => {
                setHabits(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to fetch community habits");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-140px)] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] bg-slate-50 dark:bg-slate-900 p-4 py-8">
            <div className="max-w-6xl mx-auto w-full space-y-6">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                            Community Feed
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Get inspired by what habits others are building.
                        </p>
                    </div>
                </div>

                {/* Habits Grid */}
                {habits.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {habits.map(habit => (
                            <HabitCard
                                key={habit._id}
                                habit={{ ...habit, id: habit._id }}
                                showActions={false}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State UI */
                    <Card className="flex flex-col items-center justify-center py-24 text-center border-dashed border-2 ring-0 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50">
                        <div className="rounded-full bg-slate-100 dark:bg-slate-900 p-4 mb-4">
                            <Users className="h-10 w-10 text-slate-500" />
                        </div>
                        <CardTitle className="text-2xl font-semibold mb-2">No Community Habits</CardTitle>
                        <CardDescription className="max-w-md mx-auto mb-6">
                            No one has created any public habits yet. Be the first to start tracking!
                        </CardDescription>
                        <Link to="/habits/add">
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Create First Habit
                            </Button>
                        </Link>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default AllHabits;
