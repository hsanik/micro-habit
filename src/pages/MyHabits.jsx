import React, { useState, useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Plus, ListChecks } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import HabitCard from '../components/HabitCard';
import { toast } from 'react-toastify';

// Dummy data to visualize UI before backend integration
const DUMMY_HABITS = [
    {
        id: "1",
        title: "Drink Water Early",
        category: "health",
        frequency: 2,
        currentCount: 1,
        description: "Drink 2 glasses of water right after waking up.",
        createdAt: new Date().toISOString()
    },
    {
        id: "2",
        title: "Read Technical Articles",
        category: "learning",
        frequency: 1,
        currentCount: 0,
        description: "Read at least one coding or system design article per day.",
        createdAt: new Date().toISOString()
    },
    {
        id: "3",
        title: "Meditate for 10 minutes",
        category: "mindfulness",
        frequency: 1,
        currentCount: 1,
        description: "",
        createdAt: new Date().toISOString()
    }
];

const MyHabits = () => {
    const { user } = useContext(AuthContext);

    // TODO: this will be fetched from MongoDB
    const [habits, setHabits] = useState(DUMMY_HABITS);

    const handleDelete = (id) => {
        setHabits(prev => prev.filter(habit => habit.id !== id));
        toast.info("Habit removed successfully.");
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)] bg-slate-50 dark:bg-slate-900 p-4 py-8">
            <div className="max-w-6xl mx-auto w-full space-y-6">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            My Habits
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Track and manage your daily routines, {user?.displayName?.split(" ")[0]}.
                        </p>
                    </div>
                    <Link to="/habits/add">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Habit
                        </Button>
                    </Link>
                </div>

                {/* Habits Grid */}
                {habits.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {habits.map(habit => (
                            <HabitCard
                                key={habit.id}
                                habit={habit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State UI */
                    <Card className="flex flex-col items-center justify-center py-24 text-center border-dashed border-2 ring-0 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50">
                        <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/20 p-4 mb-4">
                            <ListChecks className="h-10 w-10 text-indigo-500" />
                        </div>
                        <CardTitle className="text-2xl font-semibold mb-2">No habits yet</CardTitle>
                        <CardDescription className="max-w-md mx-auto mb-6">
                            You haven't created any micro habits to track yet. Start small by adding your very first daily goal.
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

export default MyHabits;
