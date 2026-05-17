import React, { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "../styles/navbar.css";

// Sub-components
import NavLogo from "./navbar/NavLogo";
import DesktopNavLinks from "./navbar/DesktopNavLinks";
import DesktopActions from "./navbar/DesktopActions";
import MobileMenuButton from "./navbar/MobileMenuButton";
import MobileMenu from "./navbar/MobileMenu";

export default function NavBar() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const isAuthPage = location.pathname === "/auth";
    const authMode = searchParams.get("mode") || "signin";

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

    // Common size for the main icons
    const ICON_SIZE = 22;

    return (
        <nav className="fixed top-0 w-full z-50 bg-[var(--nav-bg)] border-b border-[var(--nav-border)] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center space-x-8">
                        <NavLogo />
                        <DesktopNavLinks />
                    </div>

                    <DesktopActions 
                        ICON_SIZE={ICON_SIZE}
                        isUserDropdownOpen={isUserDropdownOpen}
                        toggleUserDropdown={toggleUserDropdown}
                        setIsUserDropdownOpen={setIsUserDropdownOpen}
                        isAuthPage={isAuthPage}
                        authMode={authMode}
                    />

                    <MobileMenuButton 
                        isMobileMenuOpen={isMobileMenuOpen} 
                        toggleMobileMenu={toggleMobileMenu} 
                    />
                </div>
            </div>

            <MobileMenu isMobileMenuOpen={isMobileMenuOpen} />
        </nav>
    );
}
