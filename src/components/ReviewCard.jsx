import { motion } from 'framer-motion'

export default function ReviewCard({ review }) {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-mpicchu-amber' : 'text-gray-300'}>
                ★
            </span>
        ))
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Fecha no disponible'

        // Handle Firestore timestamp
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">{review.author}</h3>
                    <p className="text-sm text-slate-500">{formatDate(review.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex text-xl">
                        {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                        {review.rating}/5
                    </span>
                </div>
            </div>

            {/* Comment */}
            <p className="text-slate-700 leading-relaxed">{review.comment}</p>

            {/* Verified Badge (optional) */}
            <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Reseña Verificada
                </span>
            </div>
        </motion.div>
    )
}
