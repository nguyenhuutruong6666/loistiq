import HeroSection from '@/components/client/home/HeroSection';
import PhilosophySection from '@/components/client/home/PhilosophySection';
import Carousel3DGallery from '@/components/client/home/Carousel3DGallery';
import BentoGridSection from '@/components/client/home/BentoGridSection';
import ParallaxSection from '@/components/client/home/ParallaxSection';

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
