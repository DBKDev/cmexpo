import React, { useState } from 'react';
import '../Styles/Administrateur/Navbar.css'
import { Link } from 'react-router-dom';

const NavBarDash = () => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleSidebar = () => {
            setIsOpen(!isOpen);
            menuBtnChange(); // appel de la fonction (facultatif)
        };

        const menuBtnChange = () => {
            // Définissez ici la fonction menuBtnChange si nécessaire
        };

        return (
            <>
                <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                    <div className="logo-details">
                        <i className='bx bxl-c-plus-plus icon'></i>
                        <div className="logo_name">CMAPP</div>
                        <i className='bx bx-menu' id="btn" onClick={toggleSidebar}></i>
                    </div>
                    <ul className="nav-list">
                        <li>
                            <a href="#">
                                <i className='bx bx-grid-alt'></i>
                                <span className="links_name">Dashboard</span>
                            </a>
                            <span className="tooltip">Dashboard</span>
                        </li>
                        <li>
                            <a href="#">
                                <i className='bx bx-user'></i>
                                <span className="links_name">User</span>
                            </a>
                            <span className="tooltip">User</span>
                        </li>
                        <li>
                            <a href="#">
                                <i className='bx bx-chat'></i>
                                <span className="links_name">Messages</span>
                            </a>
                            <span className="tooltip">Messages</span>
                        </li>
                        <li>
                            <a href="#">
                                <i className='bx bx-pie-chart-alt-2'></i>
                                <span className="links_name">Analytics</span>
                            </a>
                            <span className="tooltip">Analytics</span>
                        </li>
                        <li>
                            <a href="#">
                                <i className='bx bx-folder'></i>
                                <span className="links_name">File Manager</span>
                            </a>
                            <span className="tooltip">Files</span>
                        </li>
                        <li className="profile">
                            <div className="profile-details">
                                <div className="name_job">
                                    <div className="name">Déconnexion</div>
                                    <div className="job">Dashboard</div>
                                </div>
                            </div>
                            <i className='bx bx-log-out' id="log_out"></i>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    export default NavBarDash ;