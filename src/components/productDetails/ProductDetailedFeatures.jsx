import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ProductDetailedFeatures({ features }) {
    return (
        <div className="w-full">
            <h3 className="text-2xl font-black text-gray-900 mb-8">
                Detailed Features
            </h3>
            
            {/* Bullet points */}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {features?.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="text-[var(--brand-secondary)] shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-700 leading-relaxed font-medium">
                            {f}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Info box */}
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl text-sm text-blue-800 leading-relaxed">
                <span className="font-bold text-[var(--brand-primary)] block mb-2">Important Note</span>
                The image provided here is only for reference purpose. Actual product packaging and materials may contain more and different information than what is shown on our app or website. We recommend that you do not rely solely on the information presented here and that you always read labels, warnings, and directions before using or consuming a product.
            </div>
        </div>
    );
}
