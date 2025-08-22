"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
  alt: string
  className?: string
}

export function ImageCarousel({ images, alt, className = "" }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className={`w-full h-48 bg-muted flex items-center justify-center rounded-lg ${className}`}>
        <span className="text-muted-foreground text-sm">No images available</span>
      </div>
    )
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className={`relative w-full h-48 ${className}`}>
      {/* Main Image */}
      <div className="w-full h-full bg-white rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 right-2 flex gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex 
                  ? "bg-white" 
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
