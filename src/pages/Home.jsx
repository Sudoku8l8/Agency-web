import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getFeaturedTours } from '../services/toursService'
import SEO from '../components/SEO'
import { Award, BadgeDollarSign, ShieldCheck, Headphones, Users, Sparkles } from 'lucide-react'

export default function Home() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [featuredTours, setFeaturedTours] = useState([])
    const [loading, setLoading] = useState(true)
    const [scrollY, setScrollY] = useState(0)

    // Typewriter state
    const [typewriterText, setTypewriterText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [loopNum, setLoopNum] = useState(0)
    const [typingSpeed, setTypingSpeed] = useState(150)

    // Search state
    const [searchParams, setSearchParams] = useState({
        destination: '',
        duration: ''
    })

    const heroImages = [
        '/hero-cusco.jpg',
        '/hero-rafting.jpg',
        '/hero-ceremony.jpg'
    ]

    const typewriterWords = ['Descubre', 'Explora', 'Vive', 'Siente']

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Typewriter effect
    useEffect(() => {
        const handleType = () => {
            const i = loopNum % typewriterWords.length
            const fullText = typewriterWords[i]

            setTypewriterText(isDeleting
                ? fullText.substring(0, typewriterText.length - 1)
                : fullText.substring(0, typewriterText.length + 1)
            )

            setTypingSpeed(isDeleting ? 30 : 150)

            if (!isDeleting && typewriterText === fullText) {
                setTimeout(() => setIsDeleting(true), 2000)
            } else if (isDeleting && typewriterText === '') {
                setIsDeleting(false)
                setLoopNum(loopNum + 1)
                setTypingSpeed(500)
            }
        }

        const timer = setTimeout(handleType, typingSpeed)
        return () => clearTimeout(timer)
    }, [typewriterText, isDeleting, loopNum, typingSpeed])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        loadFeaturedTours()
    }, [])

    const loadFeaturedTours = async () => {
        try {
            const tours = await getFeaturedTours()
            // Filter only active tours
            setFeaturedTours(tours.filter(t => t.isActive !== false))
        } catch (error) {
            console.error('Error loading featured tours:', error)
            setFeaturedTours([])
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = () => {
        // Build query string from search params
        const params = new URLSearchParams()
        if (searchParams.destination) {
            params.append('search', searchParams.destination)
        }
        if (searchParams.duration && searchParams.duration !== 'Cualquiera') {
            params.append('duration', searchParams.duration)
        }

        // Navigate to tours page with search params
        navigate(`/tours?${params.toString()}`)
    }

    const handleQuickSearch = (term) => {
        navigate(`/tours?search=${encodeURIComponent(term)}`)
    }

    return (
        <div className="min-h-screen">
            <SEO
                title={t('home.heroTitle')}
                description={t('home.heroSubtitle')}
            />

            {/* Hero Section - Enhanced with Parallax */}
            <section className="relative h-screen overflow-hidden">
                {/* Background Image Slider with Parallax */}
                <div className="absolute inset-0">
                    {heroImages.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${img})`,
                                backgroundSize: 'cover',
                                backgroundPosition: `center ${scrollY * 0.5}px`,
                                transform: `translateY(${scrollY * 0.3}px)`,
                                transition: 'background-position 0.1s ease-out'
                            }}
                        />
                    ))}
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex items-end justify-center px-4 pb-7">
                    <div className="max-w-6xl w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-center"
                        >

                            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-2 drop-shadow-2xl">
                                <span className="text-andino-gold">{typewriterText}</span>
                                <span className="animate-pulse">|</span>
                                <br />
                                la Magia de Cusco
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 mb-20 font-light max-w-3xl mx-auto drop-shadow-lg">
                                {t('home.heroSubtitle')}
                            </p>

                            {/* Search Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="max-w-2xl mx-auto mb-8"
                            >
                                <div className="bg-white rounded-2xl shadow-2xl p-2">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                        {/* Destination */}
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                                            <span className="text-xl">📍</span>
                                            <div className="flex-grow text-left">
                                                <label className="text-xs text-slate-500 font-semibold">Destino</label>
                                                <input
                                                    type="text"
                                                    placeholder="¿A dónde vamos?"
                                                    value={searchParams.destination}
                                                    onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                                    className="w-full text-slate-800 font-medium outline-none bg-transparent"
                                                />
                                            </div>
                                        </div>

                                        {/* Duration */}
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                                            <span className="text-xl">⏱️</span>
                                            <div className="flex-grow text-left">
                                                <label className="text-xs text-slate-500 font-semibold">Duración</label>
                                                <select
                                                    value={searchParams.duration}
                                                    onChange={(e) => setSearchParams({ ...searchParams, duration: e.target.value })}
                                                    className="w-full text-slate-800 font-medium outline-none bg-transparent cursor-pointer"
                                                >
                                                    <option>Cualquiera</option>
                                                    <option>Medio día</option>
                                                    <option>1 día</option>
                                                    <option>2-3 días</option>
                                                    <option>4+ días</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Search Button */}
                                        <button
                                            onClick={handleSearch}
                                            className="btn-primary flex items-center justify-center gap-2 text-base font-semibold py-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            Buscar
                                        </button>
                                    </div>
                                </div>


                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <a
                                    href="https://wa.me/51984123456"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2"
                                >
                                    <span>💬</span> Consultar por WhatsApp
                                </a>
                                <a
                                    href="#destacados"
                                    className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-sacred-purple transition-all"
                                >
                                    Ver Tours Destacados
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Ir a slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </section>

            {/* Quick Search - Improved */}
            <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-andino-gold rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-andino-light-green rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                            {t('home.quickSearch')}
                        </h2>
                        <p className="text-xl text-white/90">
                            {t('home.exploreTours')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                name: 'Aventura',
                                icon: '🏔️',
                                gradient: 'from-red-500 to-orange-500',
                                description: 'Adrenalina y emoción',
                                image: '/tour-rafting.jpg'
                            },
                            {
                                name: 'Arqueología',
                                icon: '🏛️',
                                gradient: 'from-amber-500 to-yellow-500',
                                description: 'Historia ancestral',
                                image: '/tour-valle.jpg'
                            },
                            {
                                name: 'Místico',
                                icon: '🔮',
                                gradient: 'from-purple-500 to-pink-500',
                                description: 'Conexión espiritual',
                                image: '/tour-ayahuasca.jpg'
                            },
                            {
                                name: 'Naturaleza',
                                icon: '🌿',
                                gradient: 'from-green-500 to-emerald-500',
                                description: 'Flora y fauna',
                                image: '/tour-manu.jpg'
                            }
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                onClick={() => handleQuickSearch(category.name)}
                                className="group cursor-pointer relative overflow-hidden rounded-2xl h-64"
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="text-4xl mb-2">{category.icon}</div>
                                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                                    <p className="text-sm text-white/80">{category.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Tours Section */}
            <section id="destacados" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title mb-4">
                            {t('home.featuredTours')}
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            {t('home.featuredSubtitle')}
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-andino-green mx-auto mb-4"></div>
                            <p className="text-slate-600">Cargando experiencias...</p>
                        </div>
                    ) : featuredTours.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-600">No hay tours disponibles en este momento.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredTours.map((tour, index) => (
                                <motion.div
                                    key={tour.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="card group cursor-pointer"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-br from-andino-green/80 to-andino-light-green/80 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                                        {/* Premium Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            {tour.badge === 'MÁS POPULAR' && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.5, type: "spring" }}
                                                    className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-xs flex items-center gap-1 shadow-lg"
                                                >
                                                    <Sparkles className="w-3 h-3" />
                                                    MÁS POPULAR
                                                </motion.div>
                                            )}
                                            {tour.badge === 'NUEVO' && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.5, type: "spring" }}
                                                    className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg"
                                                >
                                                    ✨ NUEVO
                                                </motion.div>
                                            )}
                                            {tour.badge === 'OFERTA' && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.5, type: "spring" }}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg animate-pulse"
                                                >
                                                    🔥 OFERTA
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="absolute top-4 right-4 bg-andino-gold text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                            {tour.category}
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <h3 className="text-2xl font-display font-bold mb-2 leading-tight">{tour.title}</h3>
                                            <p className="text-sm opacity-90 mb-3 line-clamp-2">{tour.shortDescription}</p>

                                            {/* Star Rating */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex items-center gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-sm text-white/90">(4.9) · 245 reviews</span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="text-2xl font-bold">${tour.price}</span>
                                                    <span className="text-xs text-white/80 ml-1">/ persona</span>
                                                </div>
                                                <span className="text-sm bg-white/20 px-2 py-1 rounded">⏱️ {tour.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <Link
                                            to={`/tours/${tour.slug}`}
                                            className="block w-full text-center btn-primary"
                                        >
                                            Ver Detalles
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link to="/tours" className="btn-secondary inline-flex items-center gap-2">
                            Ver Todos los Tours
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 transform translate-x-20" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="section-title mb-6">
                                {t('home.whyChooseUs')}
                            </h2>
                            <p className="text-lg text-slate-600 mb-8">
                                Somos expertos locales comprometidos con brindarte experiencias auténticas, seguras e inolvidables en el corazón de los Andes.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: <Award className="w-8 h-8 text-andino-gold" />,
                                        title: 'Experiencia Premium',
                                        desc: 'Servicio personalizado y guías expertos'
                                    },
                                    {
                                        icon: <BadgeDollarSign className="w-8 h-8 text-andino-green" />,
                                        title: 'Mejores Precios',
                                        desc: 'Sin intermediarios, trato directo'
                                    },
                                    {
                                        icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
                                        title: 'Seguridad Total',
                                        desc: 'Operadores certificados y seguros'
                                    },
                                    {
                                        icon: <Headphones className="w-8 h-8 text-purple-500" />,
                                        title: 'Soporte 24/7',
                                        desc: 'Estamos contigo en todo momento'
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-white p-6 rounded-xl shadow-lg border border-slate-100"
                                    >
                                        <div className="bg-slate-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="/hero-ceremony.jpg"
                                    alt="Experiencia Andina"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Users className="w-6 h-6 text-andino-gold" />
                                            <span className="font-bold text-xl">5,000+</span>
                                        </div>
                                        <p className="text-sm opacity-90">Viajeros felices cada año</p>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-andino-gold rounded-full blur-3xl opacity-30 z-[-1]" />
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-andino-green rounded-full blur-3xl opacity-30 z-[-1]" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-gradient-to-r from-andino-green to-andino-light-green text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        ¿Listo para tu próxima aventura?
                    </h2>
                    <p className="text-xl opacity-90 mb-10">
                        Personalizamos tu viaje a medida. Cuéntanos tus sueños y nosotros los hacemos realidad.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/checkout"
                            className="bg-white text-andino-green px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all shadow-xl hover:scale-105"
                        >
                            Reservar Ahora
                        </Link>
                        <a
                            href="https://wa.me/51984123456"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                        >
                            Contactar Asesor
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
