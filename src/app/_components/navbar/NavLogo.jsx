import React from 'react';
import Link from 'next/link';
import logoImg from '@/assets/images/logo.jpg';

export default function NavLogo() {
    return (
        <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
                <img src={logoImg?.src || logoImg} alt="Brand Logo" className="h-10 w-auto object-contain" />
            </Link>
        </div>
    );
}
