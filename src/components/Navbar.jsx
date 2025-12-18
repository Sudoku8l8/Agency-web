import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Calendar, BookOpen, FileText } from 'lucide-react'
import LanguageSelector from './LanguageSelector'

import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslation()
    const { isAuthenticated, logout } = useAuth()

    return (
        <nav className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50">
            {/* Language Selector - Fixed Top Right */}
            <div className="absolute top-4 right-1 z-50 hidden md:block">
                <LanguageSelector />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-display font-bold text-gradient"
                        >
                            🏔️ MyAgencia
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 pr-20">
                        <Link to="/" className="nav-link">
                            {t('nav.home')}
                        </Link>
                        <Link to="/tours" className="nav-link">
                            {t('nav.tours')}
                        </Link>
                        <Link to="/eventos" className="nav-link flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Eventos
                        </Link>
                        <Link to="/guia-viajes" className="nav-link flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            Guía de Viajes
                        </Link>
                        <Link to="/blog" className="nav-link flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            Blog
                        </Link>

                        {isAuthenticated && (
                            <>
                                <Link to="/admin" className="nav-link">
                                    Admin
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-slate-700 hover:text-red-600 font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-slate-700 hover:text-andino-green"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden pb-4 border-t border-slate-200 pt-4"
                    >
                        <div className="flex flex-col space-y-3">
                            <Link to="/" className="nav-link-mobile">
                                {t('nav.home')}
                            </Link>
                            <Link to="/tours" className="nav-link-mobile">
                                {t('nav.tours')}
                            </Link>
                            <Link to="/eventos" className="nav-link-mobile flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Eventos
                            </Link>
                            <Link to="/guia-viajes" className="nav-link-mobile flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Guía de Viajes
                            </Link>
                            <Link to="/blog" className="nav-link-mobile flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Blog
                            </Link>

                            {isAuthenticated && (
                                <>
                                    <Link to="/admin" className="nav-link-mobile">
                                        Admin
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="text-left text-slate-700 hover:text-red-600 font-medium"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}

                            <Link to="/checkout" className="btn-primary inline-block text-center">
                                {t('nav.bookNow')}
                            </Link>

                            <div className="pt-2 border-t border-slate-200">
                                <LanguageSelector />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </nav>
    )
}
