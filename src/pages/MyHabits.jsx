import React, { useState, useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { Plus, ListChecks, Activity, CheckCircle2, TrendingUp } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import HabitCard from '../components/HabitCard';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const MyHabits = () => {
    const { user } = useContext(AuthContext);

    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        if (user?.email) {
            axios.get(`${import.meta.env.VITE_API_URL}/habits/user/${user.email}`)
                .then(res => {
                    setHabits(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    toast.error("Failed to fetch your habits");
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/habits/${id}`);
            setHabits(prev => prev.filter(habit => habit._id !== id));
            toast.info("Habit removed successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete habit");
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[calc(100vh-140px)] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    // Analytics Calculations
    const totalHabits = habits.length;
    const completedHabits = habits.filter(h => h.currentCount >= h.frequency).length;
    const pendingHabits = totalHabits - completedHabits;
    const completionRate = totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

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

                {/* Analytics Dashboard Segment */}
                {habits.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <Card className="border-0 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
                                <ListChecks className="h-4 w-4 text-slate-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalHabits}</div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Active tracking goals</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{completedHabits}</div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Daily targets met</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                                <Activity className="h-4 w-4 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{pendingHabits}</div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Left to complete today</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 ring-1 ring-slate-200 dark:ring-slate-800 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                                <TrendingUp className="h-4 w-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{completionRate}%</div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Overall progress</p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Habits Grid */}
                {habits.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {habits.map(habit => (
                            <HabitCard
                                key={habit._id}
                                habit={{ ...habit, id: habit._id }}
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
