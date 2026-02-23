import React, { useContext, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';

const Signup = () => {
    const { signUp, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        photoURL: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signUp(formData.email, formData.password, formData.name, formData.photoURL);
            navigate('/');
        } catch (error) {
            console.error("Sign up failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await signInWithGoogle();
            navigate('/');
        } catch (error) {
            console.error("Google sign up failed", error);
        }
    };

    return (
        <div className="flex items-center py-10 justify-center min-h-[calc(100vh-140px)] bg-gradient-to-bl from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4">
            <Card className="w-full max-w-md shadow-xl border-0 ring-1 ring-slate-200/50 dark:ring-slate-800">
                <CardHeader className="space-y-1 pb-6">
                    <CardTitle className="text-3xl font-bold tracking-tight text-center">Create an account</CardTitle>
                    <CardDescription className="text-center text-slate-500 dark:text-slate-400">
                        Start tracking your habits today
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="transition-all focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="photoURL">Photo URL <span className="text-slate-400 font-normal">(Optional)</span></Label>
                            <Input
                                id="photoURL"
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                value={formData.photoURL}
                                onChange={handleChange}
                                className="transition-all focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="transition-all focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="transition-all focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>

                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors mt-6" type="submit" disabled={loading}>
                            {loading ? "Creating account..." : "Sign up"}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200 dark:border-slate-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-950 px-2 text-slate-500 dark:text-slate-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <Button variant="outline" type="button" className="w-full font-medium transition-colors" onClick={handleGoogleSignUp}>
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Google
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-100 dark:border-slate-800/50 pt-6 mt-2">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Signup;
