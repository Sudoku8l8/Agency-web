import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getTourBySlug } from '../services/toursService'
import { getReviewsByTour } from '../services/reviewsService'
import { useState, useEffect } from 'react'
import ImageGallery from '../components/ImageGallery'
import ReviewsSection from '../components/ReviewsSection'
import ReviewForm from '../components/ReviewForm'
import ReviewCard from '../components/ReviewCard'
import SEO from '../components/SEO'

export default function TourDetail() {
    const { id } = useParams() // This is actually the slug now
    const navigate = useNavigate()
    const [tour, setTour] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState('')
    const [numPeople, setNumPeople] = useState(1)
    const [capacityError, setCapacityError] = useState('')
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [reviews, setReviews] = useState([])
    const [loadingReviews, setLoadingReviews] = useState(true)

    useEffect(() => {
        loadTour()
    }, [id])

    const loadTour = async () => {
        try {
            // Try to get tour by slug first, fallback to id for backward compatibility
            let tourData = await getTourBySlug(id)

            if (!tourData) {
                // If not found by slug, the tour doesn't exist
                setTour(null)
            } else {
                setTour(tourData)
                // Load reviews for this tour
                loadReviews(tourData.id)
            }
        } catch (error) {
            console.error('Error loading tour:', error)
            setTour(null)
        } finally {
            setLoading(false)
        }
    }

    const loadReviews = async (tourId) => {
        try {
            const reviewsData = await getReviewsByTour(tourId)
            setReviews(reviewsData)
        } catch (error) {
            console.error('Error loading reviews:', error)
        } finally {
            setLoadingReviews(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen py-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-andino-green mx-auto mb-4"></div>
                    <p className="text-slate-600">Cargando tour...</p>
                </div>
            </div>
        )
    }

    if (!tour) {
        return (
            <div className="min-h-screen py-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold text-slate-700 mb-4">Tour no encontrado</h1>
                    <Link to="/tours" className="btn-primary">
                        Ver todos los tours
                    </Link>
                </div>
            </div>
        )
    }

    const handleBooking = () => {
        const bookingData = {
            tour: tour,
            date: selectedDate,
            numPeople: numPeople,
            totalPrice: tour.price * numPeople
        }
        localStorage.setItem('currentBooking', JSON.stringify(bookingData))
        navigate('/checkout')
    }

    const getCategoryColor = (category) => {
        const colors = {
            'Arqueología': 'from-inca-gold to-yellow-600',
            'Aventura': 'from-sunset-orange to-red-600',
            'Místico': 'from-sacred-purple to-purple-800',
            'Naturaleza': 'from-mystic-teal to-green-600'
        }
        return colors[category] || 'from-mountain-blue to-blue-800'
    }

    // Parse groupSize to get max capacity
    const getMaxCapacity = () => {
        if (!tour || !tour.groupSize) return 20
        // groupSize might be "2-15 personas" or just "15"
        const match = tour.groupSize.match(/(\d+)(?!.*\d)/)
        return match ? parseInt(match[1]) : 20
    }

    const handlePeopleChange = (value) => {
        const maxCapacity = getMaxCapacity()
        const peopleNum = parseInt(value) || 1

        if (peopleNum > maxCapacity) {
            setCapacityError(`Este tour permite máximo ${maxCapacity} personas`)
            setNumPeople(maxCapacity)
        } else if (peopleNum < 1) {
            setCapacityError('')
            setNumPeople(1)
        } else {
            setCapacityError('')
            setNumPeople(peopleNum)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO
                title={tour.title}
                description={tour.shortDescription}
                image={tour.image}
            />
            {/* Hero Section with Tour Image Background */}
            <section className="relative h-[500px] overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${tour.image})` }}
                >
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <div className="mb-4">
                            <span className={`inline-block bg-gradient-to-r ${getCategoryColor(tour.category)} text-white px-6 py-2 rounded-full font-semibold text-lg shadow-lg`}>
                                {tour.category}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 drop-shadow-lg">
                            {tour.title}
                        </h1>
                        <p className="text-xl text-white/90 mb-6 drop-shadow-md">{tour.shortDescription}</p>
                        <div className="flex flex-wrap justify-center gap-6 text-white">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <span className="text-2xl">⏱️</span>
                                <span className="font-semibold">{tour.duration}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <span className="text-2xl">👥</span>
                                <span className="font-semibold">{tour.groupSize}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <span className="text-2xl">📊</span>
                                <span className="font-semibold">{tour.difficulty}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative bottom wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card p-8"
                        >
                            <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">Descripción</h2>
                            <p className="text-slate-600 text-lg leading-relaxed">{tour.description}</p>
                        </motion.section>

                        {/* Image Gallery */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="card p-8"
                        >
                            <h2 className="text-3xl font-display font-bold text-slate-800 mb-6">Galería de Fotos</h2>
                            <ImageGallery images={tour.gallery} tourTitle={tour.title} />
                        </motion.section>

                        {/* Highlights */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-8"
                        >
                            <h2 className="text-3xl font-display font-bold text-slate-800 mb-6">Lo más destacado</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {tour.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="text-2xl text-mystic-teal">✓</span>
                                        <span className="text-slate-700">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Itinerary */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-8"
                        >
                            <h2 className="text-3xl font-display font-bold text-slate-800 mb-6">Itinerario</h2>
                            <div className="space-y-6">
                                {tour.itinerary.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-andino-green to-andino-light-green flex items-center justify-center text-white font-bold text-sm text-center p-2">
                                                {item.time}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-display font-bold text-slate-800 mb-2">{item.activity}</h3>
                                            <p className="text-slate-600">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Included / Not Included */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-green-600 mb-4 flex items-center gap-2">
                                        <span>✓</span> Incluido
                                    </h3>
                                    <ul className="space-y-2">
                                        {tour.included.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-slate-700">
                                                <span className="text-green-500">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-red-600 mb-4 flex items-center gap-2">
                                        <span>✗</span> No Incluido
                                    </h3>
                                    <ul className="space-y-2">
                                        {tour.notIncluded.map((item, index) => (
                                            <li key={index} className="flex items-start gap-2 text-slate-700">
                                                <span className="text-red-500">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.section>

                        {/* Recommendations */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="card p-8 bg-blue-50"
                        >
                            <h2 className="text-3xl font-display font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span>💡</span> Recomendaciones
                            </h2>
                            <ul className="space-y-2">
                                {tour.recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start gap-2 text-slate-700">
                                        <span className="text-blue-500">•</span>
                                        <span>{rec}</span>
                                    </li>
                                ))}
                            </ul>
                            {tour.restrictions && (
                                <div className="mt-6 p-4 bg-red-100 rounded-lg">
                                    <h3 className="font-bold text-red-800 mb-2">⚠️ Restricciones Importantes</h3>
                                    <ul className="space-y-1">
                                        {tour.restrictions.map((restriction, index) => (
                                            <li key={index} className="text-red-700 text-sm">• {restriction}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.section>
                    </div>

                    {/* Sidebar - Booking Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card p-6 sticky top-24"
                        >
                            <div className="text-center mb-6">
                                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-andino-green to-andino-light-green mb-2">
                                    ${tour.price}
                                </div>
                                <div className="text-slate-600">por persona</div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        📅 Fecha del Tour
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-andino-green focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        👥 Número de Personas
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={getMaxCapacity()}
                                        value={numPeople}
                                        onChange={(e) => handlePeopleChange(e.target.value)}
                                        className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-andino-green focus:outline-none"
                                    />
                                    {capacityError && (
                                        <p className="text-red-500 text-sm mt-1">{capacityError}</p>
                                    )}
                                    <p className="text-slate-500 text-xs mt-1">Máximo: {getMaxCapacity()} personas</p>
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-4 mb-6">
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total:</span>
                                    <span className="text-andino-green">${tour.price * numPeople}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                disabled={!selectedDate}
                                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Reservar Ahora
                            </button>

                            <div className="mt-4 text-center">
                                <a
                                    href={`https://wa.me/51984123456?text=Hola, estoy interesado en el tour: ${tour.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-600 hover:text-green-700 font-semibold flex items-center justify-center gap-2"
                                >
                                    <span>💬</span> Consultar por WhatsApp
                                </a>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-200 text-sm text-slate-600 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span>✓</span> Cancelación gratuita hasta 48h antes
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>✓</span> Confirmación inmediata
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>✓</span> Guías certificados
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-display font-bold text-slate-800 mb-2">Reseñas de Clientes</h2>
                                <p className="text-slate-600">Comparte tu experiencia con otros viajeros</p>
                            </div>
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="btn-primary flex items-center gap-2"
                            >
                                <span>⭐</span> Escribir Reseña
                            </button>
                        </div>

                        {/* Reviews Display */}
                        {loadingReviews ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-andino-green mx-auto mb-4"></div>
                                <p className="text-slate-600">Cargando reseñas...</p>
                            </div>
                        ) : reviews.length > 0 ? (
                            <div className="space-y-8">
                                {/* Rating Summary */}
                                <div className="card p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Average Rating */}
                                        <div className="text-center">
                                            <div className="text-6xl font-bold text-slate-800 mb-2">
                                                {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                                            </div>
                                            <div className="flex justify-center gap-1 text-3xl mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) ? 'text-yellow-400' : 'text-gray-300'}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="text-slate-600">
                                                Basado en {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}
                                            </div>
                                        </div>

                                        {/* Rating Distribution */}
                                        <div className="space-y-2">
                                            {[5, 4, 3, 2, 1].map((rating) => {
                                                const count = reviews.filter(r => r.rating === rating).length
                                                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
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

                                {/* Reviews List */}
                                <div className="space-y-6">
                                    {reviews.map((review, index) => (
                                        <motion.div
                                            key={review.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="card p-6"
                                        >
                                            <div className="flex items-start gap-4">
                                                {/* Avatar */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-andino-green to-andino-light-green flex items-center justify-center text-white font-bold text-xl">
                                                        {review.author.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>

                                                {/* Review Content */}
                                                <div className="flex-grow">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-bold text-slate-800">{review.author}</h4>
                                                            {review.email && (
                                                                <p className="text-sm text-slate-500">{review.email}</p>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="flex gap-1 text-lg mb-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                                                        ★
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <p className="text-xs text-slate-500">
                                                                {review.createdAt?.toDate?.().toLocaleDateString('es-ES', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                }) || 'Fecha no disponible'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="text-slate-700 leading-relaxed">{review.comment}</p>

                                                    <div className="mt-3 inline-flex items-center gap-1 text-sm text-green-600">
                                                        <span>✓</span>
                                                        <span className="font-semibold">Reseña Verificada</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <div className="text-6xl mb-4">💬</div>
                                <p className="text-lg">Aún no hay reseñas para este tour</p>
                                <p className="text-sm mt-2">Sé el primero en compartir tu experiencia</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Review Form Modal */}
            {showReviewForm && (
                <ReviewForm
                    tourId={tour.id}
                    tourTitle={tour.title}
                    onClose={() => setShowReviewForm(false)}
                />
            )}
        </div>
    )
}
