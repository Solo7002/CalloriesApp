import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainImage from '../images/Main.png';
import UserProfileImage from '../images/User_Profile.png';

const Navbar = () => {
    // Check if user is logged in
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light px-5" style={{ backgroundColor: '#245501' }}>
            <Link className="navbar-brand text-white" to="/">
                <img src={MainImage} alt="Home" style={{ height: '40px' }} />
            </Link>
            <div className="collapse navbar-collapse d-flex justify-content-between">
                <ul className="navbar-nav">
                    {user && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/statistics">Statistics</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/calendar">Calendar</Link>
                            </li>
                        </>
                    )}
                </ul>
                <ul className="navbar-nav">
                    {user ? ( // If user is logged in, display greeting and logout link
                        <>
                            <li className="nav-item d-flex align-items-center">
                                
                                <Link className="nav-link text-white" to="/cabinet">
                                    <img src={UserProfileImage} alt="User Profile" style={{ height: '40px', marginRight: '10px' }} />
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="#" onClick={handleLogout}>Logout</Link>
                            </li>
                        </>
                    ) : ( // If user is not logged in, display login and register links
                        <>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
