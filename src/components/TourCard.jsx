import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function TourCard({ tour }) {
    const getCategoryColor = (category) => {
        const colors = {
            'Arqueología': 'bg-inca-gold',
            'Aventura': 'bg-sunset-orange',
            'Místico': 'bg-sacred-purple',
            'Naturaleza': 'bg-mystic-teal'
        }
        return colors[category] || 'bg-mountain-blue'
    }

    const getDifficultyIcon = (difficulty) => {
        const icons = {
            'Fácil': '⭐',
            'Moderado': '⭐⭐',
            'Moderado-Difícil': '⭐⭐⭐',
            'Difícil': '⭐⭐⭐⭐',
            'Espiritual': '🕉️'
        }
        return icons[difficulty] || '⭐'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="card group cursor-pointer h-full flex flex-col"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-br from-sacred-purple/80 to-mystic-teal/80 opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <span className={`${getCategoryColor(tour.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {tour.category}
                    </span>
                    <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                        {getDifficultyIcon(tour.difficulty)} {tour.difficulty}
                    </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">{tour.title}</h3>
                    <p className="text-sm opacity-90 mb-3 line-clamp-2">{tour.shortDescription}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-3xl font-bold">${tour.price}</span>
                        <span className="text-sm">⏱️ {tour.duration}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4 flex-grow">
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                        <span>👥 {tour.groupSize}</span>
                    </div>
                    <div className="space-y-1">
                        {tour.highlights.slice(0, 3).map((highlight, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className="text-mystic-teal">✓</span>
                                <span>{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <Link
                    to={`/tours/${tour.slug}`}
                    className="block w-full text-center btn-primary mt-auto"
                >
                    Ver Detalles
                </Link>
            </div>
        </motion.div>
    )
}

TourCard.propTypes = {
    tour: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        duration: PropTypes.string.isRequired,
        difficulty: PropTypes.string.isRequired,
        groupSize: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        highlights: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
}
