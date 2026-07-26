import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import ResponsiveImage from '../common/ResponsiveImage';

export default function PlaceGallery({ photos, placeName }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setActiveIdx(0);
    setImageError(false);
  }, [photos, placeName]);

  const hasPhotos = Array.isArray(photos) && photos.length > 0 && !imageError;

  // CRITICAL REQUIREMENT: Never display empty placeholders.
  // If no image exists, hide the image section completely instead of rendering a blank placeholder.
  if (!hasPhotos) {
    return null;
  }

  const currentPhoto = photos[activeIdx] || photos[0];
  if (!currentPhoto) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg mb-6 group">
      {/* Primary High-Quality Responsive Hero Image */}
      <ResponsiveImage
        src={currentPhoto}
        alt={`${placeName || 'Destination'} view ${activeIdx + 1}`}
        className="w-full h-56 sm:h-72 relative overflow-hidden bg-slate-950"
        imageClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onImageError={() => {
          // If there are other photos in the array, jump to next or set error
          if (photos.length > 1 && activeIdx + 1 < photos.length) {
            setActiveIdx(activeIdx + 1);
          } else {
            setImageError(true);
          }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-70 pointer-events-none" />
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 text-xs font-bold shadow-sm">
            <Camera className="h-3.5 w-3.5 text-sky-400" />
            <span>Google Places Photography</span>
          </span>
          {photos.length > 1 && (
            <span className="text-xs font-mono font-extrabold text-white bg-indigo-600/90 px-2.5 py-1 rounded-md shadow">
              {activeIdx + 1} / {photos.length}
            </span>
          )}
        </div>
      </ResponsiveImage>

      {/* Interactive Thumbnails Row with Skeleton Loading */}
      {photos.length > 1 && (
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2.5 overflow-x-auto scrollbar-none">
          {photos.map((photoUrl, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIdx(index)}
              aria-label={`View photo ${index + 1}`}
              className={`w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer relative bg-slate-900 ${
                activeIdx === index
                  ? 'border-sky-400 ring-2 ring-sky-400/30 scale-95 shadow-md'
                  : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
              }`}
            >
              <img
                src={photoUrl}
                alt="thumbnail"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
