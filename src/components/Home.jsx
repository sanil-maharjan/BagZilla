import HeroSection from "./home/HeroSection";
import FeaturesSection from "./home/FeaturesSection";
import TopPicks from "./home/TopPicks";
import CTASection from "./home/CTASection";

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
