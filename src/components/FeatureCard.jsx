import React from 'react';
import { ArrowRight } from 'lucide-react';

// Componente simples para cada Card
const FeatureCard = ({ title, description, icon: Icon }) => (
  <div className="bg-[#f9f9f9] p-6 rounded-xl shadow-md border border-gray-200
                  hover:shadow-lg hover:scale-[1.02] transition-transform
                  duration-300 hover:border-green-200">
    <div className="flex items-center mb-4">
      <div className="p-2 bg-green-50 rounded-lg">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-lg text-green-600 font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex items-center text-green-600 hover:text-green-700 cursor-pointer group">
      <span className="text-sm font-medium">Learn more</span>
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

const FeatureCards = () => {
  const features = [
    {
      title: 'Quick Transfer',
      description: 'Convert your playlist in seconds',
      // Ícone pode ser importado diretamente ou de qualquer outra lib
      icon: require('lucide-react').Zap
    },
    {
      title: 'Track Matching',
      description: 'Smart algorithm for accurate matching',
      icon: require('lucide-react').Target
    },
    {
      title: 'Free to Use',
      description: 'No registration required',
      icon: require('lucide-react').Gift
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
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
