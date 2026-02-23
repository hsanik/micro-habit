import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router';
import AuthContext from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, LogOut, Settings, User } from 'lucide-react';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'All Habits', path: '/habits' },
    ];

    if (user) {
        navLinks.push({ name: 'Add Habit', path: '/habits/add' });
        navLinks.push({ name: 'My Habits', path: '/my-habits' });
    }

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <Activity className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                        MicroHabit
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex flex-1 items-center justify-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 ${isActive(link.path)
                                    ? "text-indigo-600 dark:text-indigo-400"
                                    : "text-slate-600 dark:text-slate-300"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Authentication / User Menu Section */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/auth/login">
                                <Button variant="ghost" className="hidden sm:flex">Sign In</Button>
                            </Link>
                            <Link to="/auth/register">
                                <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
                            </Link>
                        </div>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full focus-visible:ring-2 focus-visible:ring-indigo-500">
                                    <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-800">
                                        <AvatarImage src={user.photoURL} alt={user.displayName || "User"} />
                                        <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                                            {user.displayName ? user.displayName.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <Link to="/profile" className="flex items-center w-full">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Profile Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logOut} className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
