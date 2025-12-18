import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PageTransition from './components/PageTransition'

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'))
const Tours = lazy(() => import('./pages/Tours'))
const TourDetail = lazy(() => import('./pages/TourDetail'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Admin = lazy(() => import('./pages/Admin'))
const About = lazy(() => import('./pages/About'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sacred-purple"></div>
        </div>
    )
}

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={<LoadingSpinner />}>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/tours" element={<PageTransition><Tours /></PageTransition>} />
                    <Route path="/tours/:id" element={<PageTransition><TourDetail /></PageTransition>} />
                    <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
                    <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                    <Route
                        path="/admin"
                        element={
                            <PageTransition>
                                <ProtectedRoute>
                                    <Admin />
                                </ProtectedRoute>
                            </PageTransition>
                        }
                    />
                    <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                    <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
                    <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    )
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppLayoutWithFooter />
            </Router>
        </AuthProvider>
    )
}

function AppLayoutWithFooter() {
    const location = useLocation();
    const hideFooter = location.pathname.startsWith('/admin');
    return (
        <div className="min-h-screen flex flex-col">
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        theme: { primary: '#4aed88' },
                    },
                }}
            />
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
                <AnimatedRoutes />
            </main>
            {!hideFooter && <Footer />}

            {/* Global Floating WhatsApp Button */}
            <a
                href="https://wa.me/51986769066?text=Hola,%20quiero%20información%20sobre%20tours"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-green-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-3 group animate-bounce-in"
                style={{
                    animation: 'bounce-in 0.6s ease-out 2s backwards, float 3s ease-in-out infinite'
                }}
            >
                <svg className="w-6 h-6 animate-wiggle" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div className="flex flex-col">
                    <span className="font-bold text-sm">¡Reserva Ya!</span>
                    <span className="text-xs opacity-90">Vía WhatsApp</span>
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </a>
        </div>
    );
}

export default App
