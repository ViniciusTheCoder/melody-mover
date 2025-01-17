import React from 'react';

const AudioWaveAnimation = () => {
  const bars = 45; 
  
  return (
    <div className="w-full flex justify-center items-center py-8">
      <div 
        className="flex justify-between h-16 w-full max-w-[1200px]"
        style={{
          '--boxSize': '12px', 
          '--gutter': '8px',   
          gap: 'var(--gutter)' 
        }}
      >
        {Array.from({ length: bars }).map((_, index) => (
          <div
            key={index}
            className="h-full rounded-lg bg-[#3d7460] flex-1"
            style={{
              maxWidth: 'var(--boxSize)',
              animation: `${index % 3 === 0 ? 'normal' : index % 2 === 0 ? 'loud' : 'quiet'} 1.2s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`, 
              transform: 'scaleY(0.4)'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes quiet {
          25% { transform: scaleY(0.6); }
          50% { transform: scaleY(0.4); }
          75% { transform: scaleY(0.8); }
        }

        @keyframes normal {
          25% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
          75% { transform: scaleY(0.6); }
        }

        @keyframes loud {
          25% { transform: scaleY(1); }
          50% { transform: scaleY(0.4); }
          75% { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  );
};

export default AudioWaveAnimation;