import React, { useState, useRef } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function ImageZoom({ src, alt }) {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [isHover, setIsHover] = useState(false);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
    };

    return (
        <div
            className="relative w-full max-h-96 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-contain transition-transform duration-200 ${
                    isHover ? 'scale-150' : 'scale-100'
                }`}
                style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
            />
        </div>
    );
}
export default ImageZoom;
