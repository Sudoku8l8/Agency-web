import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'

export default function LanguageSelector() {
    const { i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    const languages = [
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' }
    ]

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-andino-green to-andino-light-green text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <Globe className="w-4 h-4" />
                <span className="text-2xl">{currentLanguage.flag}</span>
                <span className="font-semibold text-sm">{currentLanguage.code.toUpperCase()}</span>
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                        >
                            {languages.map((lang, index) => (
                                <motion.button
                                    key={lang.code}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-andino-green/10 hover:to-andino-light-green/10 transition-all duration-300 ${i18n.language === lang.code
                                            ? 'bg-gradient-to-r from-andino-green/20 to-andino-light-green/20'
                                            : ''
                                        }`}
                                >
                                    <span className="text-3xl">{lang.flag}</span>
                                    <div className="flex-grow text-left">
                                        <div className="font-semibold text-slate-800">{lang.name}</div>
                                        <div className="text-xs text-slate-500">{lang.code.toUpperCase()}</div>
                                    </div>
                                    {i18n.language === lang.code && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-6 h-6 bg-andino-green rounded-full flex items-center justify-center"
                                        >
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
