import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { Loader2 } from 'lucide-react';

const UpdateHabit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [frequency, setFrequency] = useState('1');
    const [description, setDescription] = useState('');

    useEffect(() => {
        // TODO: Replace with actual backend call
        const fetchHabit = async () => {
            try {
                // TODO: Replace with actual backend call
                await new Promise(resolve => setTimeout(resolve, 600));

                // Simulated Response Data representing the habit they want to edit
                const simulatedData = {
                    title: "Drink Water Early",
                    category: "health",
                    frequency: 2,
                    description: "Drink 2 glasses of water right after waking up."
                };

                setTitle(simulatedData.title);
                setCategory(simulatedData.category);
                setFrequency(simulatedData.frequency.toString());
                setDescription(simulatedData.description);
                setFetching(false);
            } catch (error) {
                console.error("Failed to fetch habit details", error);
                toast.error("Could not load habit data.");
                navigate('/my-habits');
            }
        };

        fetchHabit();
    }, [id, navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title.trim() || !category) {
            toast.error("Please fill in the title and category");
            return;
        }

        setLoading(true);

        const updatedData = {
            title,
            category,
            frequency: parseInt(frequency),
            description,
        };

        try {
            // TODO: Replace with actual backend PUT/PATCH call
            console.log("Submitting Habit Edit Payload:", updatedData);
            await new Promise(resolve => setTimeout(resolve, 800));

            toast.success('Habit updated successfully!');
            navigate('/my-habits');
        } catch (error) {
            console.error(error);
            toast.error("Failed to update habit");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex min-h-[calc(100vh-140px)] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] bg-slate-50 dark:bg-slate-900 p-4">
            <Card className="w-full max-w-2xl shadow-lg border-0 ring-1 ring-slate-200 dark:ring-slate-800">
                <CardHeader className="space-y-1 pb-6 bg-slate-100/50 dark:bg-slate-950/20 rounded-t-xl border-b border-slate-200 dark:border-slate-800/50">
                    <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Edit Habit</CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400">
                        Make changes to your micro habit target.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-base font-medium">Habit Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="transition-all focus:ring-2 focus:ring-indigo-500/20 py-6 text-lg"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium">Notes & Description</Label>
                            <Textarea
                                id="description"
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
                                className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white font-medium transition-colors px-8"
                            >
                                {loading ? "Updating..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateHabit;
