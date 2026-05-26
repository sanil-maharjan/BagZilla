"use client";

import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";

const FeaturesSection = dynamic(() => import("./FeaturesSection"), { ssr: false });
const TopPicks       = dynamic(() => import("./TopPicks"),          { ssr: false });
const CTASection     = dynamic(() => import("./CTASection"),         { ssr: false });

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <HeroSection />
            <FeaturesSection />
            <TopPicks />
            <CTASection />
        </div>
    );
}
