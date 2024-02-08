import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/Firebase';
import './scss/styles/_app.scss';
import "./scss/styles/_main.scss";
import MedicationList from './components/MedicationList';
import Register from './components/Register';
import Login from './components/Login';
import PasswordlessLogin from './components/PasswordlessLogin';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // This listener will keep user state updated with the current auth state
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe; // Unsubscribe on unmount
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Clear the user state

        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <Router>
            <div className="app">
                <nav>
                    <h1 className="title">My Medications List</h1>
                    {!user ? (
                        // If user is not logged in, show login/register
                        <>
                            <Link to="/login" className="nav-link">Login </Link>
                            <Link to="/register" className="nav-link">Register</Link>
                        </>
                    ) : (
                        // If user is logged in, show logout
                        <>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </nav>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/passwordless-login" element={<PasswordlessLogin />} />
                    <Route path="/medications" element={user ? <MedicationList /> : <Navigate replace to="/login" />} />
                    <Route path="/" element={<Navigate replace to={user ? "/medications" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

