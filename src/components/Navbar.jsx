import React from 'react';
import AudioVisualizer from './AudioVisualizer';

const Navbar = ({ audioVisualizerRef, showVisualizerOnly }) => {
  return (
    <nav className={`fixed left-0 right-0 z-50 bg-[#28170e] transition-all duration-300 ${showVisualizerOnly ? 'py-2 bottom-0' : 'py-0 top-0'}`}>
      <div className="mx-auto grid grid-cols-1">
        <div className={`transition-all duration-300 ${showVisualizerOnly ? 'h-0 overflow-hidden' : 'h-32'}`}>
            <div className="flex items-center gap-1.5 justify-center text-center">
              <img src="arabian-oud.svg" alt="الشعار" className="h-32" />
            </div>
        </div>
        <div className="w-full">
          <AudioVisualizer ref={audioVisualizerRef} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;