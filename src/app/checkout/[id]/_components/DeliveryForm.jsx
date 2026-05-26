import React from 'react';
import { User, Phone, MapPin } from 'lucide-react';

export default function DeliveryForm({ formData, handleInputChange }) {
    return (
        <div className="w-full bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="text-[var(--brand-primary)]" />
                Delivery Information
            </h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User size={18} className="text-gray-400" />
                            </div>
                            <input 
                                type="text" 
                                name="fullName" 
                                value={formData.fullName} 
                                onChange={handleInputChange} 
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all" 
                                placeholder="John Doe" 
                                required 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone size={18} className="text-gray-400" />
                            </div>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleInputChange} 
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all" 
                                placeholder="98XXXXXXXX" 
                                required 
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Location (Address) *</label>
                    <input 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all" 
                        placeholder="House/Apartment no., Street name, Area" 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark (Optional)</label>
                    <input 
                        type="text" 
                        name="landmark" 
                        value={formData.landmark} 
                        onChange={handleInputChange} 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all" 
                        placeholder="E.g. Near City Mall" 
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Other Details (Optional)</label>
                    <textarea 
                        name="details" 
                        value={formData.details} 
                        onChange={handleInputChange} 
                        rows="3" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent outline-none transition-all resize-none" 
                        placeholder="Any specific instructions for delivery?"
                    ></textarea>
                </div>
            </form>
        </div>
    );
}
