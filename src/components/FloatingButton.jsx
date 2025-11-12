import React from 'react';

const FloatingButton = ({ onClick, isPlaying }) => {
  return (
    <button
      onClick={onClick}
      className="fixed z-50 bottom-16 right-8 bg-white text-[#28170e] size-10 rounded-full shadow-lg flex items-center justify-center focus:outline-none transform transition-transform hover:scale-110"
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        </svg>
      )}
    </button>
  );
};

export default FloatingButton;