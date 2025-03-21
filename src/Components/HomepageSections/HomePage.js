import React from "react";
import HeroSection from './HeroSection';
import InfoCardsSection from './InfoCardsSection';
import VideoSection from './VideoSection';
import StatisticsSection from './StatisticsSection';
import BloodTypesSection from './BloodTypesSection';
import EmergencySection from './EmergencySection';
import GallerySection from './GallerySection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <InfoCardsSection />
      <StatisticsSection />
      <BloodTypesSection />
      <EmergencySection />
      <GallerySection />
      <VideoSection />
    </main>
  );
}
