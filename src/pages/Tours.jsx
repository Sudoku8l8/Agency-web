import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllTours } from '../services/toursService'
import TourCard from '../components/TourCard'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

export default function Tours() {
    const { t } = useTranslation()
    const [searchParams] = useSearchParams()
    const categoryFromUrl = searchParams.get('category')
    const searchFromUrl = searchParams.get('search')
    const durationFromUrl = searchParams.get('duration')

    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('Todos')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedDuration, setSelectedDuration] = useState('Todas')

    // Load tours from Firestore
    useEffect(() => {
        loadTours()
    }, [])

    const loadTours = async () => {
        try {
            const toursData = await getAllTours()
            // Filter only active tours
            setTours(toursData.filter(t => t.isActive !== false))
        } catch (error) {
            console.error('Error loading tours:', error)
            setTours([])
        } finally {
            setLoading(false)
        }
    }

    // Set filters from URL on mount
    useEffect(() => {
        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl)
        }
        if (searchFromUrl) {
            setSearchQuery(searchFromUrl)
        }
        if (durationFromUrl) {
            setSelectedDuration(durationFromUrl)
        }
    }, [categoryFromUrl, searchFromUrl, durationFromUrl])

    // Get unique categories from tours
    const categories = ['Todos', ...Array.from(new Set(tours.map(t => t.category)))]

    const filteredTours = tours.filter(tour => {
        const matchesCategory = selectedCategory === 'Todos' || tour.category === selectedCategory
        const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tour.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())

        // Duration filter
        let matchesDuration = true
        if (selectedDuration && selectedDuration !== 'Todas') {
            const duration = tour.duration.toLowerCase()
            if (selectedDuration === 'Medio día') {
                matchesDuration = duration.includes('medio') || duration.includes('half')
            } else if (selectedDuration === '1 día') {
                matchesDuration = duration.includes('1 día') || duration.includes('día completo') || duration.includes('full day')
            } else if (selectedDuration === '2-3 días') {
                matchesDuration = duration.includes('2') || duration.includes('3')
            } else if (selectedDuration === '4+ días') {
                matchesDuration = duration.includes('4') || duration.includes('5') || duration.includes('6') || duration.includes('7')
            }
        }

        return matchesCategory && matchesSearch && matchesDuration
    })

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO
                title="Nuestros Tours"
                description="Explora nuestra selección de tours en Cusco: Machu Picchu, Valle Sagrado, Montaña de Colores y más. Aventuras inolvidables te esperan."
            />
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-andino-green via-andino-light-green to-andino-gold py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-display font-bold text-white mb-6"
                    >
                        Nuestras Experiencias
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/90 max-w-3xl mx-auto"
                    >
                        {t('tours.subtitle')}
                    </motion.p>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-5 bg-white shadow-md sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder={t('tours.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-3 rounded-lg border-2 border-slate-200 focus:border-andino-green focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-andino-green to-andino-light-green text-white shadow-lg scale-105'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-center text-slate-600">
                        {filteredTours.length} {filteredTours.length === 1 ? t('tours.experienceFound') : t('tours.experiencesFound')}
                    </div>
                </div>
            </section>

            {/* Tours Grid */}
            <section className="py-15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-andino-green mx-auto mb-4"></div>
                            <p className="text-slate-600">Cargando tours...</p>
                        </div>
                    ) : filteredTours.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredTours.map((tour) => (
                                <TourCard key={tour.id} tour={tour} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-display font-bold text-slate-700 mb-2">
                                {t('tours.noToursFound')}
                            </h3>
                            <p className="text-slate-600">
                                {t('tours.tryAnotherSearch')}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-display font-bold mb-4">
                        {t('tours.notFindingWhat')}
                    </h2>
                    <p className="text-xl mb-8 text-slate-300">
                        {t('tours.customExperiences')}
                    </p>
                    <a
                        href="https://wa.me/51984123456"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-xl"
                    >
                        💬 Contáctanos por WhatsApp
                    </a>
                </div>
            </section>
        </div>
    )
}
