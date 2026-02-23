import React, { useState } from 'react';
import HabitCard from '../components/HabitCard';
import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router';
import { Plus, Users } from 'lucide-react';

// TODO: Replace with actual backend call
const PUBLIC_HABITS = [
    {
        id: "public-1",
        title: "Read Technical Articles",
        category: "learning",
        frequency: 1,
        currentCount: 0,
        description: "Read at least one coding or system design article per day.",
        userEmail: "anotheruser@example.com",
        userName: "Alex Dev",
        createdAt: new Date().toISOString()
    },
    {
        id: "public-2",
        title: "10K Steps",
        category: "health",
        frequency: 2,
        currentCount: 1,
        description: "Hit 5k steps by lunch, 10k by dinner.",
        userEmail: "healthfreak@example.com",
        userName: "Sarah Fitness",
        createdAt: new Date().toISOString()
    },
    {
        id: "public-3",
        title: "No Spend Day",
        category: "finance",
        frequency: 1,
        currentCount: 0,
        description: "Buy absolutely zero non-essential items today.",
        userEmail: "saver@example.com",
        userName: "Finance Bro",
        createdAt: new Date().toISOString()
    },
    {
        id: "public-4",
        title: "Meditate for 10 minutes",
        category: "mindfulness",
        frequency: 1,
        currentCount: 1,
        description: "Clear my mind every morning before opening any screens.",
        userEmail: "zen@example.com",
        userName: "Zen Master",
        createdAt: new Date().toISOString()
    }
];

const AllHabits = () => {
    // TODO: Replace with actual backend call
    const [habits] = useState(PUBLIC_HABITS);

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
                                key={habit.id}
                                habit={habit}
                                showActions={false} // Don't let users delete or complete other peoples habits
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
