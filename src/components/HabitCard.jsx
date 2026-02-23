import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Check, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

const HabitCard = ({ habit, onDelete, showActions = true }) => {
    const [progressCount, setProgressCount] = useState(habit.currentCount || 0);

    const isCompleted = progressCount >= habit.frequency;

    const handleCheck = () => {
        if (!isCompleted) {
            setProgressCount(prev => prev + 1);
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            health: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300",
            productivity: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
            learning: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
            mindfulness: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
            finance: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300",
            other: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
        };
        return colors[category] || colors.other;
    };

    return (
        <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md border-0 ring-1 ring-slate-200 dark:ring-slate-800 h-full">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1 over">
                        <Badge variant="secondary" className={`${getCategoryColor(habit.category)} border-0 font-medium capitalize mb-1`}>
                            {habit.category}
                        </Badge>
                        <CardTitle className="text-xl line-clamp-1">{habit.title}</CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <CardDescription className="line-clamp-2 h-10 mb-4 whitespace-pre-wrap">
                    {habit.description || "No notes added for this habit."}
                </CardDescription>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-500 dark:text-slate-400">Daily Progress</span>
                        <span className={isCompleted ? "text-emerald-500 font-bold" : "text-slate-700 dark:text-slate-300"}>
                            {progressCount} / {habit.frequency}
                        </span>
                    </div>
                    <Progress value={(progressCount / habit.frequency) * 100} className={`h-2 ${isCompleted && "bg-emerald-100 dark:bg-emerald-950 [&>div]:bg-emerald-500"}`} />
                </div>
            </CardContent>

            {showActions && (
                <CardFooter className="pt-0 flex gap-2">
                    <Button
                        onClick={handleCheck}
                        disabled={isCompleted}
                        className={`flex-1 transition-all ${isCompleted
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                    >
                        {isCompleted ? (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Completed
                            </>
                        ) : (
                            "Log Progress"
                        )}
                    </Button>

                    <Link to={`/habits/${habit.id}/edit`}>
                        <Button variant="outline" size="icon" className="transition-colors">
                            <Edit className="h-4 w-4 text-slate-500" />
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(habit.id)}
                        className="transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default HabitCard;
