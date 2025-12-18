import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <SEO
                title="Página No Encontrada"
                description="Lo sentimos, la página que buscas no existe."
            />
            <div className="text-center max-w-lg">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-sacred-purple to-mystic-teal mb-4">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">
                        ¡Ups! Página no encontrada
                    </h2>
                    <p className="text-slate-600 text-lg mb-8">
                        Parece que te has perdido en los Andes. La página que buscas no existe o ha sido movida.
                    </p>
                    <Link
                        to="/"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Volver al Inicio
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
