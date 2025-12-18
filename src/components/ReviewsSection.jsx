import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { useState } from 'react'

export default function ReviewsSection({ reviews, averageRating, totalReviews }) {
    const [filter, setFilter] = useState('all')

    const filteredReviews = filter === 'all'
        ? reviews
        : reviews.filter(r => r.rating === parseInt(filter))

    const getRatingDistribution = () => {
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        reviews.forEach(review => {
            distribution[review.rating]++
        })
        return distribution
    }

    const distribution = getRatingDistribution()

    const renderStars = (rating, size = 'text-xl') => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`${size} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                        ★
                    </span>
                ))}
            </div>
        )
    }

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) return 'Hace 1 día'
        if (diffDays < 30) return `Hace ${diffDays} días`
        if (diffDays < 60) return 'Hace 1 mes'
        const months = Math.floor(diffDays / 30)
        return `Hace ${months} meses`
    }

    return (
        <div className="space-y-8">
            {/* Rating Summary */}
            <div className="card p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Average Rating */}
                    <div className="text-center">
                        <div className="text-6xl font-bold text-slate-800 mb-2">
                            {averageRating.toFixed(1)}
                        </div>
                        {renderStars(Math.round(averageRating), 'text-3xl')}
                        <div className="text-slate-600 mt-2">
                            Basado en {totalReviews} {totalReviews === 1 ? 'reseña' : 'reseñas'}
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = distribution[rating]
                            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                            return (
                                <div key={rating} className="flex items-center gap-3">
                                    <span className="text-sm font-semibold w-12">{rating} ★</span>
                                    <div className="flex-grow bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-yellow-400 h-2 rounded-full transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-slate-600 w-12 text-right">{count}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${filter === 'all'
                            ? 'bg-gradient-to-r from-sacred-purple to-mystic-teal text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                >
                    Todas ({totalReviews})
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                        key={rating}
                        onClick={() => setFilter(rating.toString())}
                        className={`px-4 py-2 rounded-full font-semibold transition-all ${filter === rating.toString()
                                ? 'bg-gradient-to-r from-sacred-purple to-mystic-teal text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                    >
                        {rating} ★ ({distribution[rating]})
                    </button>
                ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {filteredReviews.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        No hay reseñas con esta calificación
                    </div>
                ) : (
                    filteredReviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card p-6"
                        >
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sacred-purple to-mystic-teal flex items-center justify-center text-white font-bold text-xl">
                                        {review.name.charAt(0)}
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="flex-grow">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h4 className="font-bold text-slate-800">{review.name}</h4>
                                            <p className="text-sm text-slate-500">{review.location}</p>
                                        </div>
                                        <div className="text-right">
                                            {renderStars(review.rating, 'text-lg')}
                                            <p className="text-xs text-slate-500 mt-1">{getTimeAgo(review.date)}</p>
                                        </div>
                                    </div>

                                    {review.tourDate && (
                                        <p className="text-sm text-slate-600 mb-2">
                                            <span className="font-semibold">Fecha del tour:</span> {new Date(review.tourDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                                        </p>
                                    )}

                                    <p className="text-slate-700 leading-relaxed">{review.comment}</p>

                                    {review.verified && (
                                        <div className="mt-3 inline-flex items-center gap-1 text-sm text-green-600">
                                            <span>✓</span>
                                            <span className="font-semibold">Compra verificada</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    )
}

ReviewsSection.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            comment: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            tourDate: PropTypes.string,
            verified: PropTypes.bool
        })
    ).isRequired,
    averageRating: PropTypes.number.isRequired,
    totalReviews: PropTypes.number.isRequired
}
