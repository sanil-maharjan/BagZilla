"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function PaymentStatusActions({ status }) {
    return (
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <Link 
                href="/shop" 
                className="flex-1 py-3 px-6 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 hover:shadow-md transition-all text-center cursor-pointer"
            >
                <ShoppingBag size={18} />
                Continue Shopping
            </Link>
            {status !== 'success' && (
                <Link 
                    href="/" 
                    className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-xl font-bold text-center hover:bg-gray-200 transition-all cursor-pointer"
                >
                    Back to Home
                </Link>
            )}
        </div>
    );
}
