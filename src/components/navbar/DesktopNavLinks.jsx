import React from 'react';
import { NavLink } from 'react-router-dom';

export default function DesktopNavLinks() {
    return (
        <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" end className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>Shop</NavLink>
            <NavLink to="/offers" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>Offers</NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>About</NavLink>
        </div>
    );
}
