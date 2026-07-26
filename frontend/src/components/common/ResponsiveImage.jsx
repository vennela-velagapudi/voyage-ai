import React, { useState, useEffect } from 'react';

/**
 * ResponsiveImage Component
 * Implements production-quality image display guidelines:
 * - Lazy loading via loading="lazy" and decoding="async"
 * - Retains clean aspect ratio with object-cover and rounded corners
 * - Renders a sleek skeleton loading animation while fetching
 * - Automatically attempts fallback imagery if primary URL fails
 * - Completely hides the image section if no image exists or if errors occur (no empty placeholders)
 */
export default function ResponsiveImage({
  src,
  alt = 'Photograph',
  fallbackSrc = null,
  className = 'w-full h-56 sm:h-64 relative overflow-hidden rounded-2xl bg-slate-900',
  imageClassName = 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
  children,
  onImageError,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  // Sync state if incoming src prop changes
  useEffect(() => {
    const nextSrc = src || fallbackSrc;
    setCurrentSrc(nextSrc);
    setIsLoading(Boolean(nextSrc));
    setHasError(!nextSrc);
  }, [src, fallbackSrc]);

  // If no valid source exists or loading failed entirely, completely hide the component (no blank placeholders)
  if (!currentSrc || hasError) {
    return null;
  }

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
      if (onImageError) {
        onImageError();
      }
    }
  };

  return (
    <div className={className}>
      {/* Shimmer loading skeleton while image is fetching */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-pulse z-10" />
      )}

      <img
        src={currentSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        className={`${imageClassName} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
      />

      {/* Render optional overlays, captions, or interactive badges over the photo */}
      {!hasError && children}
    </div>
  );
}
