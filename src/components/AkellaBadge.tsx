import React, { useRef, MouseEvent, useState } from 'react';
import './AkellaBadge.css';

// Image Assets
const IMG_BACK_1 = "/assets/Adobe Express - file (6).png";
const IMG_BACK_2 = "/assets/Adobe Express - file (7).png";
const IMG_RIBBON_BOT = "/assets/Adobe Express - file (8).png";
const IMG_RIBBON_TOP = "/assets/Adobe Express - file (9).png";
const IMG_WOLF = "/assets/Adobe Express - file (10).png";

const AkellaBadge: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // State for CSS variables
  const [style, setStyle] = useState<React.CSSProperties>({
    '--mx': '50%',
    '--my': '50%',
    '--rx': '0deg',
    '--ry': '0deg',
    '--hyp': 0,
    '--angle': '0deg',
  } as React.CSSProperties);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse position relative to element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Percentages (0 - 100)
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    // Center offsets for rotation (-1 to 1)
    const xOffset = (x / width) - 0.5;
    const yOffset = (y / height) - 0.5;

    // Tilt Max Degrees
    const tiltMax = 20; 
    const rx = (yOffset * -tiltMax).toFixed(2); // Rotate X (up/down flip)
    const ry = (xOffset * tiltMax).toFixed(2);  // Rotate Y (left/right flip)

    // Hypotenuse (Distance from center, 0 to ~1.4) - Used for Shine Intensity
    const hyp = Math.sqrt(Math.pow(xOffset, 2) + Math.pow(yOffset, 2)) * 2;

    // Angle of mouse (0 to 360) - Used for Gradient Rotation
    const angle = (Math.atan2(yOffset, xOffset) * 180) / Math.PI;

    setStyle({
      '--mx': `${xPercent}%`,
      '--my': `${yPercent}%`,
      '--rx': `${rx}deg`,
      '--ry': `${ry}deg`,
      '--hyp': hyp,
      '--angle': `${angle}deg`,
    } as React.CSSProperties);
  };

  const handleMouseLeave = () => {
    // Reset to center on leave
    setStyle({
      '--mx': '50%',
      '--my': '50%',
      '--rx': '0deg',
      '--ry': '0deg',
      '--hyp': 0,
      '--angle': '0deg',
    } as React.CSSProperties);
  };

  return (
    <div className="akella-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="badge" ref={cardRef} style={style}>
        
        {/* Layer 1: Base Background */}
        <div className="badge-layer layer-back-1">
          <img src={IMG_BACK_1} alt="Badge Base" />
        </div>

        {/* Layer 2: Background Details */}
        <div className="badge-layer layer-back-2">
          <img src={IMG_BACK_2} alt="Badge Details" />
        </div>

        {/* Layer 3: Bottom Ribbon (In Motion) */}
        <div className="badge-layer layer-ribbon-bot">
          <img src={IMG_RIBBON_BOT} alt="In Motion Ribbon" />
        </div>

        {/* Layer 4: Top Ribbon (Akella) */}
        <div className="badge-layer layer-ribbon-top">
          <img src={IMG_RIBBON_TOP} alt="Akella Ribbon" />
        </div>

        {/* Layer 5: Wolf Head (Front) */}
        <div className="badge-layer layer-wolf">
          <img src={IMG_WOLF} alt="Wolf Head" />
        </div>

      </div>
    </div>
  );
};

export default AkellaBadge;