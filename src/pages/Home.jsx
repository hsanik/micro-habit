import React, { useContext } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, TrendingUp, Zap, Target } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);

    const features = [
        {
            name: 'Start Small',
            description: 'Build momentum by tracking tiny, achievable daily actions rather than overwhelming goals.',
            icon: Target,
            color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
        },
        {
            name: 'Stay Consistent',
            description: 'Consistency is key. Watch your streaks grow and build unbreakable routines.',
            icon: TrendingUp,
            color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400'
        },
        {
            name: 'Feel Rewarded',
            description: 'Experience the dopamine hit of checking off your daily tasks and visualizing your progress.',
            icon: Zap,
            color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400'
        }
    ];

    return (
        <div className="flex flex-col min-h-[calc(100vh-140px)]">
            {/* Hero Section */}
            <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-24 text-center overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-200 to-cyan-200 dark:from-indigo-900/50 dark:to-cyan-900/50 opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/50 px-3 py-1 text-sm font-medium text-indigo-600 dark:border-indigo-800/50 dark:bg-indigo-900/20 dark:text-indigo-300">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mr-2 animate-pulse"></span>
                        Version 1.0 is now live
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Master your life with <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">Micro Habits</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300">
                        Stop setting massive, unreachable goals. The true secret to changing your life is focusing on tiny, consistent daily actions. Start tracking today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        {user ? (
                            <Link to="/my-habits">
                                <Button size="lg" className="h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                                    Go to My Dashboard
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link to="/auth/register">
                                    <Button size="lg" className="h-14 px-8 text-base bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                                        Start Tracking Free
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link to="/auth/login">
                                    <Button size="lg" variant="outline" className="h-14 px-8 text-base w-full sm:w-auto border-slate-300 dark:border-slate-700">
                                        Sign in to Account
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="pt-8 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No credit card required
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100% Free forever
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Section */}
            <section className="bg-white dark:bg-slate-950 py-24 px-4 border-t border-slate-100 dark:border-slate-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Everything you need to build better routines</h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Simple, effective tools designed to help you succeed without the overwhelm.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="flex flex-col items-center text-center space-y-4">
                                    <div className={`p-4 rounded-2xl ${feature.color}`}>
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{feature.name}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
