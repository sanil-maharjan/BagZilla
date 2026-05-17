import React from 'react';
import { NavLink } from 'react-router-dom';
import logoImg from "../../assets/images/logo.jpg";

export default function NavLogo() {
    return (
        <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" end className="flex items-center">
                <img src={logoImg} alt="Brand Logo" className="h-10 w-auto object-contain" />
            </NavLink>
        </div>
    );
}
