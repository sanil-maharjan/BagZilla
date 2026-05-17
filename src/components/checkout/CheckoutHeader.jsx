import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutHeader({ productId }) {
    return (
        <div className="w-full mb-8">
            <Link 
                to={`/product/${productId}`}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-semibold"
            >
                <ArrowLeft size={18} />
                Back to Product
            </Link>
        </div>
    );
}
