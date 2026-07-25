import React, { useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export default function PlaceGallery({ photos, placeName }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imageError, setImageError] = useState(false);

  const hasPhotos = Array.isArray(photos) && photos.length > 0 && !imageError;
  const currentPhoto = hasPhotos ? photos[activeIdx] : null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg mb-6 group">
      {hasPhotos ? (
        <>
          <div className="w-full h-56 sm:h-64 relative overflow-hidden bg-slate-950">
            <img
              src={currentPhoto}
              alt={`${placeName || 'Destination'} view ${activeIdx + 1}`}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-slate-200 text-xs font-bold shadow-sm">
                <Camera className="h-3.5 w-3.5 text-sky-400" />
                <span>Google Places Photography</span>
              </span>
              {photos.length > 1 && (
                <span className="text-xs font-mono font-extrabold text-white bg-indigo-600/80 px-2.5 py-0.5 rounded-md">
                  {activeIdx + 1} / {photos.length}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails Row */}
          {photos.length > 1 && (
            <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
              {photos.map((photoUrl, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIdx(index)}
                  className={`w-14 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    activeIdx === index
                      ? 'border-sky-400 ring-2 ring-sky-400/30 scale-95'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={photoUrl} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        /* Fallback decorative graphic if no public photos available */
        <div className="w-full h-48 sm:h-56 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 text-slate-400 p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 shadow-inner">
            <ImageIcon className="h-6 w-6" />
          </div>
          <p className="text-sm font-extrabold text-slate-200">
            {placeName || 'Selected Destination'}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Google Places Photo Preview Offline</p>
        </div>
      )}
    </div>
  );
}
