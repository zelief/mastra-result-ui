"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface ImageGalleryProps {
    images: string[];
    className?: string;
    maxImages?: number;
}

export function ImageGallery({
    images,
    className,
    maxImages = 100
}: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

    // Limit the number of images displayed
    const displayImages = images.slice(0, maxImages);
    const hasMoreImages = images.length > maxImages;

    const handleImageError = (index: number) => {
        setImageErrors(prev => new Set(prev).add(index));
    };

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    if (!displayImages.length) {
        return (
            <Card className={cn("p-8 text-center", className)}>
                <div className="text-muted-foreground">
                    <svg
                        className="mx-auto h-12 w-12 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p>No images available</p>
                </div>
            </Card>
        );
    }

    return (
        <>
            <div className={cn("space-y-4", className)}>
                {/* Image Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {displayImages.map((imageUrl, index) => {
                        const hasError = imageErrors.has(index);

                        return (
                            <div
                                key={`${imageUrl}-${index}`}
                                className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md"
                                onClick={() => handleImageClick(imageUrl)}
                            >
                                {hasError ? (
                                    <div className="flex items-center justify-center h-full bg-muted">
                                        <svg
                                            className="h-8 w-8 text-muted-foreground"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    <img
                                        src={imageUrl}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                                        onError={() => handleImageError(index)}
                                        loading="lazy"
                                    />
                                )}

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                            </div>
                        );
                    })}
                </div>

                {/* Show more indicator */}
                {hasMoreImages && (
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Showing {maxImages} of {images.length} images
                        </p>
                    </div>
                )}
            </div>

            {/* Modal for full-size image */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <img
                            src={selectedImage}
                            alt="Full size image"
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
