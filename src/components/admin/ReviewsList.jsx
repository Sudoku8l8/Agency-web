import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { subscribeToReviews, updateReviewStatus, deleteReview } from '../../services/reviewsService'
import toast from 'react-hot-toast'

export default function ReviewsList() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [selectedReview, setSelectedReview] = useState(null)

    useEffect(() => {
        // Subscribe to real-time reviews updates
        const unsubscribe = subscribeToReviews((updatedReviews) => {
            setReviews(updatedReviews)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleStatusChange = async (reviewId, newStatus) => {
        const result = await updateReviewStatus(reviewId, newStatus)
        if (result.success) {
            toast.success(`Reseña ${newStatus === 'approved' ? 'aprobada' : 'rechazada'}`)
            if (selectedReview?.id === reviewId) {
                setSelectedReview({ ...selectedReview, status: newStatus })
            }
        } else {
            toast.error('Error al actualizar: ' + result.error)
        }
    }

    const handleDelete = async (reviewId) => {
        if (confirm('¿Estás seguro de eliminar esta reseña?')) {
            const result = await deleteReview(reviewId)
            if (result.success) {
                toast.success('Reseña eliminada')
                setSelectedReview(null)
            } else {
                toast.error('Error al eliminar: ' + result.error)
            }
        }
    }

    const filteredReviews = filter === 'all'
        ? reviews
        : reviews.filter(r => r.status === filter)

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'approved': 'bg-green-100 text-green-800',
            'rejected': 'bg-red-100 text-red-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const getStatusLabel = (status) => {
        const labels = {
            'pending': 'Pendiente',
            'approved': 'Aprobada',
            'rejected': 'Rechazada'
        }
        return labels[status] || status
    }

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
            </span>
        ))
    }

    const stats = {
        total: reviews.length,
        pending: reviews.filter(r => r.status === 'pending').length,
        approved: reviews.filter(r => r.status === 'approved').length,
        rejected: reviews.filter(r => r.status === 'rejected').length
    }

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sacred-purple mx-auto mb-4"></div>
                <p className="text-slate-600">Cargando reseñas...</p>
            </div>
        )
    }

    return (
        <div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="card p-6">
                    <div className="text-sm text-slate-600 mb-1">Total</div>
                    <div className="text-3xl font-bold text-slate-800">{stats.total}</div>
                </div>
                <div className="card p-6">
                    <div className="text-sm text-slate-600 mb-1">Pendientes</div>
                    <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                </div>
                <div className="card p-6">
                    <div className="text-sm text-slate-600 mb-1">Aprobadas</div>
                    <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
                </div>
                <div className="card p-6">
                    <div className="text-sm text-slate-600 mb-1">Rechazadas</div>
                    <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Reviews List */}
                <div className="lg:col-span-2">
                    <div className="card p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-display font-bold">Reseñas</h2>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                            >
                                <option value="all">Todas</option>
                                <option value="pending">Pendientes</option>
                                <option value="approved">Aprobadas</option>
                                <option value="rejected">Rechazadas</option>
                            </select>
                        </div>

                        {filteredReviews.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">
                                <div className="text-6xl mb-4">💬</div>
                                <p>No hay reseñas {filter !== 'all' && `con estado "${getStatusLabel(filter)}"`}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredReviews.map((review) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        onClick={() => setSelectedReview(review)}
                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedReview?.id === review.id
                                                ? 'border-sacred-purple bg-purple-50'
                                                : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-slate-800">{review.tourTitle || review.tourId}</h3>
                                                <p className="text-sm text-slate-600">{review.author}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(review.status)}`}>
                                                {getStatusLabel(review.status)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1 mb-2">
                                            {renderStars(review.rating)}
                                            <span className="text-sm text-slate-600 ml-2">({review.rating}/5)</span>
                                        </div>
                                        <p className="text-sm text-slate-700 line-clamp-2">{review.comment}</p>
                                        <p className="text-xs text-slate-500 mt-2">
                                            {review.createdAt?.toDate?.().toLocaleDateString('es-ES') || 'Fecha no disponible'}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Review Detail */}
                <div className="lg:col-span-1">
                    {selectedReview ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card p-6 sticky top-24"
                        >
                            <h2 className="text-2xl font-display font-bold mb-6">Detalle de Reseña</h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-slate-700 mb-1">Tour</h3>
                                    <p className="text-slate-900">{selectedReview.tourTitle || selectedReview.tourId}</p>
                                </div>

                                <div className="border-t border-slate-200 pt-4">
                                    <h3 className="font-semibold text-slate-700 mb-2">Cliente</h3>
                                    <p className="text-slate-900">{selectedReview.author}</p>
                                    {selectedReview.email && (
                                        <p className="text-sm text-slate-600">{selectedReview.email}</p>
                                    )}
                                </div>

                                <div className="border-t border-slate-200 pt-4">
                                    <h3 className="font-semibold text-slate-700 mb-2">Calificación</h3>
                                    <div className="flex items-center gap-1">
                                        {renderStars(selectedReview.rating)}
                                        <span className="text-lg font-semibold ml-2">{selectedReview.rating}/5</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 pt-4">
                                    <h3 className="font-semibold text-slate-700 mb-2">Comentario</h3>
                                    <p className="text-slate-700">{selectedReview.comment}</p>
                                </div>

                                <div className="border-t border-slate-200 pt-4">
                                    <h3 className="font-semibold text-slate-700 mb-3">Estado</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedReview.status)}`}>
                                        {getStatusLabel(selectedReview.status)}
                                    </span>
                                </div>

                                <div className="border-t border-slate-200 pt-4">
                                    <h3 className="font-semibold text-slate-700 mb-3">Acciones</h3>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => handleStatusChange(selectedReview.id, 'approved')}
                                            disabled={selectedReview.status === 'approved'}
                                            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Aprobar
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(selectedReview.id, 'rejected')}
                                            disabled={selectedReview.status === 'rejected'}
                                            className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Rechazar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedReview.id)}
                                            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>

                                <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
                                    Creada: {selectedReview.createdAt?.toDate?.().toLocaleString('es-ES') || 'Fecha no disponible'}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="card p-6 text-center text-slate-500">
                            <div className="text-6xl mb-4">👈</div>
                            <p>Selecciona una reseña para ver los detalles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
