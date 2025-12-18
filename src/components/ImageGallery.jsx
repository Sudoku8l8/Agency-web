import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

export default function ImageGallery({ images, tourTitle }) {
    const [selectedImage, setSelectedImage] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const openLightbox = (index) => {
        setCurrentIndex(index)
        setSelectedImage(images[index])
    }

    const closeLightbox = () => {
        setSelectedImage(null)
    }

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
        setSelectedImage(images[newIndex])
    }

    const goToNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
        setSelectedImage(images[newIndex])
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') goToPrevious()
        if (e.key === 'ArrowRight') goToNext()
    }

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-video cursor-pointer overflow-hidden rounded-lg shadow-md"
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={image}
                            alt={`${tourTitle} - Imagen ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                            <span className="text-white opacity-0 hover:opacity-100 transition-opacity text-4xl">
                                🔍
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        onClick={closeLightbox}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
                            aria-label="Cerrar"
                        >
                            ✕
                        </button>

                        {/* Previous Button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goToPrevious()
                                }}
                                className="absolute left-4 text-white text-6xl hover:text-gray-300 transition-colors z-10"
                                aria-label="Anterior"
                            >
                                ‹
                            </button>
                        )}

                        {/* Image */}
                        <motion.img
                            key={currentIndex}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={selectedImage}
                            alt={`${tourTitle} - Imagen ${currentIndex + 1}`}
                            className="max-w-full max-h-[90vh] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Next Button */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goToNext()
                                }}
                                className="absolute right-4 text-white text-6xl hover:text-gray-300 transition-colors z-10"
                                aria-label="Siguiente"
                            >
                                ›
                            </button>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black/50 px-4 py-2 rounded-full">
                            {currentIndex + 1} / {images.length}
                        </div>

                        {/* Thumbnails */}
                        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        openLightbox(index)
                                    }}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${index === currentIndex
                                        ? 'border-white scale-110'
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    tourTitle: PropTypes.string.isRequired
}
