import React from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft, SearchX } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] bg-slate-50 dark:bg-slate-900 p-4 text-center">
            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800 mb-8">
                <SearchX className="h-12 w-12 text-slate-400" />
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                404
            </h1>

            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Page not found
            </h2>

            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
            </p>

            <Link to="/">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium h-12 px-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;
