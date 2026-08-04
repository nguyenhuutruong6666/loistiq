import HeroSection from '@/components/home/HeroSection';
import PhilosophySection from '@/components/home/PhilosophySection';
import Carousel3DGallery from '@/components/home/Carousel3DGallery';
import BentoGridSection from '@/components/home/BentoGridSection';
import ParallaxSection from '@/components/home/ParallaxSection';

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <HeroSection />
      <PhilosophySection />
      <Carousel3DGallery />
      <BentoGridSection />
      <ParallaxSection />
    </div>
  );
}
