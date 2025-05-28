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
                        <a href="/auth/Stats">
                            <i className='bx bx-grid-alt'></i>
                            <span className="links_name">Statistiques</span>
                        </a>
                        <span className="tooltip">Statistiques</span>
                    </li>
                    <li>
                        <a href="/auth/QRscan">
                            <i className='bx bx-qr-scan'></i>
                            <span className="links_name">Scan Code</span>
                        </a>
                        <span className="tooltip">Scan Code</span>
                    </li>
                    <li>
                        <a href="/auth/Exposant">
                            <i className='bx bx-user'></i>
                            <span className="links_name">Exposants</span>
                        </a>
                        <span className="tooltip">Exposants</span>
                    </li>
                    <li>
                        <a href="#">
                            <i className='bx bx-list-ul'></i>
                            <span className="links_name">Visiteurs</span>
                        </a>
                        <span className="tooltip">Visiteurs</span>
                    </li>
                    <li className="profile">
                        <div className="profile-details">
                            <div className="name_job">
                                <div className="name" id='deco'>Déconnexion</div>
                                <div className="job">Dashboard</div>
                            </div>
                        </div>
                        <i for="deco" className='bx bx-log-out' id="log_out"></i>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default NavBarDash;