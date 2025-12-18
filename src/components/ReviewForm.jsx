import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createReview } from '../services/reviewsService'
import toast from 'react-hot-toast'

export default function ReviewForm({ tourId, tourTitle, onClose }) {
    const [formData, setFormData] = useState({
        author: '',
        email: '',
        rating: 5,
        comment: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hoveredStar, setHoveredStar] = useState(0)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        const reviewData = {
            tourId,
            tourTitle,
            ...formData
        }

        const result = await createReview(reviewData)

        if (result.success) {
            toast.success('¡Gracias por tu reseña! Será publicada después de ser revisada.')
            onClose()
        } else {
            toast.error('Error al enviar reseña: ' + result.error)
        }

        setIsSubmitting(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-slate-800">Escribir Reseña</h2>
                            <p className="text-sm text-slate-600">{tourTitle}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Personal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Tu Nombre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                    placeholder="Juan Pérez"
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email (opcional)
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="juan@example.com"
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-3">
                                Calificación <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        className="text-4xl transition-all hover:scale-110"
                                    >
                                        <span className={
                                            star <= (hoveredStar || formData.rating)
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                        }>
                                            ★
                                        </span>
                                    </button>
                                ))}
                                <span className="ml-3 text-lg font-semibold text-slate-700">
                                    {formData.rating}/5
                                </span>
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Tu Comentario <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Cuéntanos sobre tu experiencia..."
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none resize-none"
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                {formData.comment.length} caracteres
                            </p>
                        </div>

                        {/* Info Note */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex gap-3">
                                <div className="text-blue-500 text-xl">ℹ️</div>
                                <div className="text-sm text-blue-800">
                                    <p className="font-semibold mb-1">Nota importante:</p>
                                    <p>
                                        Tu reseña será revisada por nuestro equipo antes de ser publicada.
                                        Esto nos ayuda a mantener la calidad y autenticidad de las opiniones.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-sacred-purple text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
