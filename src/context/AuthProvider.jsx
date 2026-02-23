import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import auth from "../firebase/firebase.init";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
import { toast } from 'react-toastify';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const signUp = async (email, password, displayName, photoURL) => {
        setLoading(true);
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName, photoURL });
            setUser({ ...auth.currentUser });
            setLoading(false);
            toast.success('Account created successfully');
            return result;
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            toast.success('Logged in successfully');
            return result;
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setLoading(false);
            toast.success('Logged in with Google successfully');
            return result;
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setLoading(false);
            toast.success('Logged out successfully');
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    };

    const updateUserProfile = async (displayName, photoURL) => {
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, { displayName, photoURL });
            setUser({ ...auth.currentUser });
            setLoading(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    };

    const resetPassword = async (email) => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setLoading(false);
            toast.success('Password reset email sent');
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        logOut,
        updateUserProfile,
        resetPassword
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
