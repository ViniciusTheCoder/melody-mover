"use client";

import React from 'react';
import { Zap, Target, Gift, LucideIcon, Bug, Lock, Infinity } from 'lucide-react';
import FeatureCard from './featureCard';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCards: React.FC = () => {
  const features: Feature[] = [
    {
      title: 'Quick Transfer',
      description: 'Convert your playlist in seconds.',
      icon: Zap,
    },
    {
      title: 'Track Matching',
      description: 'Smart algorithm for accurate matching.',
      icon: Target,
    },
    {
      title: 'Free to Use',
      description: 'No registration required.',
      icon: Gift,
    },
    {
      title: 'Detailed Reports',
      description: 'Get complete reports of you conversion.',
      icon: Bug,
    },
    {
        title: 'Safety Conversions',
        description: 'We don use any kind of personal data.',
        icon: Lock,
    },
    {
        title: 'Limitless Use',
        description: 'Convert how many playlists you want.',
        icon: Infinity,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  );
};

export default FeatureCards;
