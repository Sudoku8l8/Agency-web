import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, ChevronRight, Facebook, Instagram, Youtube } from 'lucide-react'
import andinoLandscape from '../assets/andino-landscape.png'

export default function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="relative mt-32">
            {/* Andino Landscape Divider */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-full">
                <svg
                    className="relative block w-full h-[150px] md:h-[200px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 200"
                    preserveAspectRatio="none"
                >
                    {/* Sky gradient background */}
                    <defs>
                        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#e8f4ea', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#c8e6d0', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <rect width="1200" height="200" fill="url(#skyGradient)" />

                    {/* Mountain layers - darkest in back */}
                    <path d="M0,120 L200,80 L400,100 L600,60 L800,90 L1000,70 L1200,110 L1200,200 L0,200 Z"
                        fill="#0f2818" opacity="0.4" />

                    {/* Middle mountain layer */}
                    <path d="M0,140 L150,110 L300,130 L500,90 L700,120 L900,95 L1100,125 L1200,140 L1200,200 L0,200 Z"
                        fill="#143d24" opacity="0.6" />

                    {/* Main mountain range with Machu Picchu silhouette */}
                    <path d="M0,160 L100,140 L180,155 L220,145 L240,150 L260,145 L280,155 L350,135 L420,150 L500,120 L550,130 L580,125 L600,130 L650,140 L750,115 L850,145 L950,130 L1050,150 L1150,140 L1200,155 L1200,200 L0,200 Z"
                        fill="#1a472a" />

                    {/* Foreground hills */}
                    <path d="M0,175 L200,170 L400,180 L600,165 L800,175 L1000,170 L1200,180 L1200,200 L0,200 Z"
                        fill="#1a472a" opacity="0.9" />

                    {/* Llama silhouettes */}
                    <ellipse cx="300" cy="172" rx="8" ry="12" fill="#0f2818" />
                    <rect x="296" y="165" width="8" height="7" fill="#0f2818" />

                    <ellipse cx="950" cy="168" rx="8" ry="12" fill="#0f2818" />
                    <rect x="946" y="161" width="8" height="7" fill="#0f2818" />
                </svg>
            </div>

            <div className="bg-[#1a472a] text-white pt-10 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Column 1: Brand & Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-display font-bold text-white">
                                    Andino
                                </span>
                                <span className="text-sm font-light text-yellow-400 tracking-widest uppercase border-b border-yellow-400 pb-1">
                                    Peru Tours
                                </span>
                            </div>

                            <p className="text-slate-200 text-sm leading-relaxed text-justify">
                                No somos simplemente una agencia de viajes; somos una familia apasionada y dedicada que se enorgullece de crear experiencias extraordinarias en uno de los destinos más fascinantes del mundo: Perú.
                            </p>

                            <div className="text-sm text-slate-300 space-y-1">
                                <p><span className="font-bold text-yellow-400">RUC:</span> 20608857851</p>
                                <p><span className="font-bold text-yellow-400">Razón Social:</span> Andino Turismo en Peru E.I.R.L</p>
                            </div>

                            {/* Social Icons */}
                            <div className="flex space-x-4 pt-4">
                                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-yellow-500 hover:text-[#1a472a] transition-all duration-300">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-yellow-500 hover:text-[#1a472a] transition-all duration-300">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-yellow-500 hover:text-[#1a472a] transition-all duration-300">
                                    <Youtube size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Column 2: Contact Info */}
                        <div className="lg:border-l lg:border-r border-white/10 lg:px-8">
                            <h3 className="text-lg font-bold text-yellow-400 mb-6 uppercase tracking-wider">
                                Información de Contacto
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                                    <div className="space-y-1 text-slate-200">
                                        <p>+51 986 769 066</p>
                                        <p>+51 914 536 279</p>
                                        <p>+51 932 273 930</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                                    <div className="space-y-1 text-slate-200 text-sm">
                                        <p>infotours@andinoperutours.com</p>
                                        <p>reservastours@andinoperutours.com</p>
                                        <p>ventas@andinoperutours.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                                    <p className="text-slate-200">
                                        Cusco, Perú
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold text-yellow-400 mb-6 uppercase tracking-wider">
                                Mayte Tour
                            </h3>

                            <ul className="space-y-3">
                                {[
                                    { name: 'Acerca de nosotros', path: '/about' },
                                    { name: 'Nuestras licencias', path: '/licenses' },
                                    { name: 'Testimonios de viajes', path: '/reviews' },
                                    { name: 'Política de privacidad', path: '/privacy' },
                                    { name: 'Términos y condiciones', path: '/terms' },
                                    { name: 'Preguntas frecuentes', path: '/faq' }
                                ].map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.path}
                                            className="group flex items-center gap-2 text-slate-200 hover:text-yellow-400 transition-colors"
                                        >
                                            <ChevronRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-white/10 mt-12 pt-8 text-center">
                        <p className="text-slate-400 text-sm">
                            &copy; {new Date().getFullYear()} Andino Perú Tours. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
