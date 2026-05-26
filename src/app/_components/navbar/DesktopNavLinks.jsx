"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DesktopNavLinks() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`nav-link-custom ${pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link href="/shop" className={`nav-link-custom ${pathname === '/shop' ? 'active' : ''}`}>Shop</Link>
            <Link href="/offers" className={`nav-link-custom ${pathname === '/offers' ? 'active' : ''}`}>Offers</Link>
            <Link href="/about" className={`nav-link-custom ${pathname === '/about' ? 'active' : ''}`}>About</Link>
        </div>
    );
}
