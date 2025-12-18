import { motion } from 'framer-motion'
import SEO from '../components/SEO'

export default function About() {
    const team = [
        {
            name: 'Carlos Quispe',
            role: 'Fundador & Guía Principal',
            bio: 'Nacido en Cusco, con más de 15 años de experiencia guiando turistas por el Valle Sagrado y Machu Picchu. Apasionado por compartir la historia y cultura inca.',
            initial: 'CQ'
        },
        {
            name: 'María Huamán',
            role: 'Coordinadora de Tours',
            bio: 'Experta en logística de viajes con 10 años de experiencia. Se asegura de que cada detalle de tu viaje sea perfecto.',
            initial: 'MH'
        },
        {
            name: 'Juan Ccahuana',
            role: 'Guía Especializado',
            bio: 'Guía certificado con especialización en arqueología inca. Habla español, inglés y quechua con fluidez.',
            initial: 'JC'
        },
        {
            name: 'Sofia Mamani',
            role: 'Atención al Cliente',
            bio: 'Siempre disponible para responder tus preguntas y ayudarte a planificar el viaje perfecto a Cusco.',
            initial: 'SM'
        }
    ]

    const values = [
        {
            icon: '🌟',
            title: 'Autenticidad',
            description: 'Experiencias genuinas que conectan con la verdadera cultura andina'
        },
        {
            icon: '🤝',
            title: 'Compromiso',
            description: 'Dedicados a superar tus expectativas en cada tour'
        },
        {
            icon: '🌱',
            title: 'Sostenibilidad',
            description: 'Turismo responsable que beneficia a las comunidades locales'
        },
        {
            icon: '❤️',
            title: 'Pasión',
            description: 'Amamos lo que hacemos y se nota en cada experiencia'
        }
    ]

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO
                title="Sobre Nosotros"
                description="Conoce a MyAgencia, tu puerta de entrada a las maravillas de Cusco y el Valle Sagrado. Guías locales expertos y experiencias auténticas."
            />
            {/* Hero Section */}
            <section className="relative h-96 bg-gradient-to-br from-sacred-purple via-mystic-teal to-inca-gold">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
                            Sobre Nosotros
                        </h1>
                        <p className="text-xl text-white/90">
                            Tu puerta de entrada a las maravillas de Cusco y el Valle Sagrado
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Nuestra Historia */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="card p-8 md:p-12">
                        <h2 className="text-4xl font-display font-bold text-slate-800 mb-6">
                            Nuestra Historia
                        </h2>
                        <div className="prose prose-lg max-w-none text-slate-600">
                            <p className="mb-4">
                                MyAgencia nació en 2010 del sueño de Carlos Quispe, un cusqueño apasionado por su tierra
                                y su cultura. Después de años trabajando como guía turístico, Carlos se dio cuenta de que
                                muchos visitantes se perdían las experiencias más auténticas de Cusco.
                            </p>
                            <p className="mb-4">
                                Decidió crear una agencia diferente: una que no solo mostrara los sitios turísticos, sino
                                que conectara a los viajeros con el alma de los Andes. Comenzamos con un pequeño equipo de
                                guías locales, todos nacidos y criados en Cusco, todos con historias que contar.
                            </p>
                            <p className="mb-4">
                                Hoy, más de 15 años después, hemos guiado a más de 10,000 viajeros de todo el mundo. Cada
                                tour es una oportunidad para compartir nuestra pasión por la cultura inca, la belleza natural
                                de los Andes, y las tradiciones vivas de nuestras comunidades.
                            </p>
                            <p>
                                No somos solo una agencia de viajes. Somos embajadores de Cusco, guardianes de su historia,
                                y tus amigos en esta aventura inolvidable.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Nuestros Valores */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl font-display font-bold text-slate-800 mb-8 text-center">
                        Nuestros Valores
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="card p-6 text-center hover:shadow-xl transition-shadow"
                            >
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-display font-bold text-slate-800 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-slate-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Nuestro Equipo */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl font-display font-bold text-slate-800 mb-8 text-center">
                        Conoce a Nuestro Equipo
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="card p-6 text-center"
                            >
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-sacred-purple to-mystic-teal flex items-center justify-center text-white font-bold text-2xl">
                                    {member.initial}
                                </div>
                                <h3 className="text-xl font-display font-bold text-slate-800 mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-mystic-teal font-semibold mb-3">
                                    {member.role}
                                </p>
                                <p className="text-slate-600 text-sm">
                                    {member.bio}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Por Qué Elegirnos */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-16"
                >
                    <div className="card p-8 md:p-12 bg-gradient-to-br from-blue-50 to-purple-50">
                        <h2 className="text-4xl font-display font-bold text-slate-800 mb-8 text-center">
                            ¿Por Qué Elegirnos?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">Guías Locales Expertos</h3>
                                    <p className="text-slate-600">Todos nuestros guías nacieron en Cusco y conocen cada rincón de la región</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">Grupos Pequeños</h3>
                                    <p className="text-slate-600">Máximo 15 personas por grupo para una experiencia personalizada</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">Turismo Responsable</h3>
                                    <p className="text-slate-600">Trabajamos directamente con comunidades locales y apoyamos proyectos sostenibles</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">Mejor Precio Garantizado</h3>
                                    <p className="text-slate-600">Sin intermediarios, precios justos y transparentes</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">Atención 24/7</h3>
                                    <p className="text-slate-600">Siempre disponibles para ayudarte antes, durante y después de tu viaje</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">✓</span>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">Certificaciones Oficiales</h3>
                                    <p className="text-slate-600">Registrados ante DIRCETUR y con todas las licencias requeridas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* CTA */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                >
                    <div className="card p-12 bg-gradient-to-r from-sacred-purple to-mystic-teal text-white">
                        <h2 className="text-3xl font-display font-bold mb-4">
                            ¿Listo para tu Aventura?
                        </h2>
                        <p className="text-xl mb-8 text-white/90">
                            Déjanos ser parte de tu historia en Cusco
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="/tours"
                                className="bg-white text-sacred-purple px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-colors"
                            >
                                Ver Nuestros Tours
                            </a>
                            <a
                                href="https://wa.me/51984123456"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
                            >
                                💬 Contáctanos
                            </a>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    )
}
