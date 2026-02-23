import React, { useState, useContext } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from 'react-toastify';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router';

const AddHabit = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [frequency, setFrequency] = useState('1');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !category) {
            toast.error("Please fill in the title and category");
            return;
        }

        setLoading(true);

        const newHabit = {
            title,
            category,
            frequency: parseInt(frequency),
            description,
            userEmail: user?.email,
            userName: user?.displayName,
            createdAt: new Date().toISOString()
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/habits`, newHabit);

            toast.success('Habit added successfully!');
            navigate('/my-habits');
        } catch (error) {
            console.error(error);
            toast.error("Failed to add habit");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-slate-50 dark:bg-slate-900 p-4">
            <Card className="w-full max-w-2xl shadow-lg border-0 ring-1 ring-slate-200 dark:ring-slate-800">
                <CardHeader className="space-y-1 pb-6 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-t-xl border-b border-indigo-100 dark:border-indigo-900/50">
                    <CardTitle className="text-3xl font-bold tracking-tight text-indigo-950 dark:text-indigo-100">Add New Habit</CardTitle>
                    <CardDescription className="text-indigo-600/80 dark:text-indigo-300">
                        Create a new habit to start tracking your daily progress.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title input */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-base font-medium">Habit Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                placeholder="e.g. Drink 2 Liters of Water"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="transition-all focus:ring-2 focus:ring-indigo-500/20 py-6 text-lg"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category Select */}
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-sm font-medium">Category <span className="text-red-500">*</span></Label>
                                <Select value={category} onValueChange={setCategory} required>
                                    <SelectTrigger className="w-full transition-all focus:ring-2 focus:ring-indigo-500/20">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="health">Health & Fitness</SelectItem>
                                        <SelectItem value="productivity">Productivity</SelectItem>
                                        <SelectItem value="learning">Learning</SelectItem>
                                        <SelectItem value="mindfulness">Mindfulness</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Frequency Input */}
                            <div className="space-y-2">
                                <Label htmlFor="frequency" className="text-sm font-medium">Daily Target Frequency</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="frequency"
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={frequency}
                                        onChange={(e) => setFrequency(e.target.value)}
                                        className="transition-all focus:ring-2 focus:ring-indigo-500/20 w-24 text-center"
                                        required
                                    />
                                    <span className="text-slate-500 text-sm">times per day</span>
                                </div>
                            </div>
                        </div>

                        {/* Description Textarea */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium">Notes & Description <span className="text-slate-400 font-normal">(Optional)</span></Label>
                            <Textarea
                                id="description"
                                placeholder="Why do you want to build this habit? Any specific details or times?"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="transition-all focus:ring-2 focus:ring-indigo-500/20 resize-y min-h-[120px]"
                            />
                        </div>

                        <div className="pt-4 flex items-center justify-end gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(-1)}
                                className="transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors px-8"
                            >
                                {loading ? "Saving..." : "Create Habit"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddHabit;
