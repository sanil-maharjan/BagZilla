import { useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import logoImg from "../assets/images/logo.jpg";
import "../styles/navbar.css";

// Import react-icons
import { FiSearch, FiHeart, FiShoppingCart, FiUser, FiKey, FiFileText, FiMenu, FiX } from "react-icons/fi";

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

                    {/* Left Side: Logo & Navigation */}
                    <div className="flex items-center space-x-8">
                        {/* Brand / Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <NavLink to="/" end className="flex items-center">
                                <img src={logoImg} alt="Brand Logo" className="h-10 w-auto object-contain" />
                            </NavLink>
                        </div>

                        {/* Desktop Navigation - Moved next to the logo */}
                        <div className="hidden md:flex items-center space-x-6">
                            <NavLink to="/" end className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>Home</NavLink>
                            <NavLink to="/shop" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>Shop</NavLink>
                            <NavLink to="/offers" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>Offers</NavLink>
                            <NavLink to="/about" className={({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`}>About</NavLink>
                        </div>
                    </div>

                    {/* Right side icons & search */}
                    <div className="hidden md:flex items-center space-x-5">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search bags..."
                                className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition-all w-52"
                            />
                            <div className="absolute left-3 top-2 text-gray-400">
                                <FiSearch size={18} />
                            </div>
                        </div>

                        {/* Icons */}
                        <NavLink to="/wishlist" className={({ isActive }) => `text-gray-600 hover:text-[var(--brand-primary)] hover:scale-125 transition-all duration-300 ${isActive ? 'text-[var(--brand-primary)]' : ''}`}>
                            <FiHeart size={ICON_SIZE} />
                        </NavLink>

                        <NavLink to="/cart" className={({ isActive }) => `relative text-gray-600 hover:text-[var(--brand-primary)] hover:scale-125 transition-all duration-300 ${isActive ? 'text-[var(--brand-primary)]' : ''}`}>
                            <FiShoppingCart size={ICON_SIZE} />
                            <span className="absolute -top-2 -right-2 bg-[var(--brand-accent)] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-white">
                                2
                            </span>
                        </NavLink>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button onClick={toggleUserDropdown} className="text-gray-600 hover:text-[var(--brand-primary)] hover:scale-125 transition-all duration-300 focus:outline-none">
                                <FiUser size={ICON_SIZE} />
                            </button>

                            {isUserDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-52 bg-white rounded-md shadow-lg py-2 border border-gray-100 ring-1 ring-black ring-opacity-5 z-50">
                                    <NavLink to="/auth?mode=signin" className={() => `flex items-center px-4 py-3 text-base dropdown-item-custom ${isAuthPage && authMode === 'signin' ? 'active' : ''}`} onClick={() => setIsUserDropdownOpen(false)}>
                                        <FiKey className="mr-3" size={20} /> Login
                                    </NavLink>
                                    <NavLink to="/auth?mode=signup" className={() => `flex items-center px-4 py-3 text-base dropdown-item-custom ${isAuthPage && authMode === 'signup' ? 'active' : ''}`} onClick={() => setIsUserDropdownOpen(false)}>
                                        <FiFileText className="mr-3" size={20} /> Register
                                    </NavLink>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            {isMobileMenuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 pb-4 shadow-lg">
                    <div className="px-4 pt-4 pb-3 space-y-1">
                        <NavLink to="/" end className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">Home</NavLink>
                        <NavLink to="/shop" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">Shop</NavLink>
                        <NavLink to="/offers" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">Offers</NavLink>
                        <NavLink to="/about" className="block px-3 py-2 rounded-md text-base font-medium nav-link-custom">About</NavLink>
                    </div>

                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-5 space-x-8">
                            <NavLink to="/wishlist" className="text-gray-600 hover:text-[var(--brand-primary)] hover:scale-110 transition-all">
                                <FiHeart size={28} />
                            </NavLink>
                            <NavLink to="/cart" className="relative text-gray-600 hover:text-[var(--brand-primary)] hover:scale-110 transition-all">
                                <FiShoppingCart size={28} />
                                <span className="absolute -top-2 -right-2 bg-[var(--brand-accent)] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    2
                                </span>
                            </NavLink>
                        </div>
                        <div className="mt-4 px-4 space-y-2">
                            <NavLink to="/auth?mode=signin" className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[var(--brand-primary)] hover:bg-[var(--bg-base)] transition-colors"><FiKey className="mr-3" size={20} /> Login</NavLink>
                            <NavLink to="/auth?mode=signup" className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-[var(--brand-primary)] hover:bg-[var(--bg-base)] transition-colors"><FiFileText className="mr-3" size={20} /> Register</NavLink>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
