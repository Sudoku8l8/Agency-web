import { motion } from 'framer-motion'
import { useState } from 'react'
import SEO from '../components/SEO'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    const faqs = [
        {
            category: 'Reservas y Pagos',
            questions: [
                {
                    q: '¿Cómo puedo reservar un tour?',
                    a: 'Puedes reservar directamente desde nuestra página web seleccionando el tour, fecha y número de personas. También puedes contactarnos por WhatsApp (+51 984 123 456) o email para reservas personalizadas.'
                },
                {
                    q: '¿Qué métodos de pago aceptan?',
                    a: 'Aceptamos transferencias bancarias, PayPal y efectivo en nuestra oficina en Cusco. Para reservas online, puedes pagar con tarjeta de crédito/débito a través de nuestra pasarela segura.'
                },
                {
                    q: '¿Debo pagar el total por adelantado?',
                    a: 'Para confirmar tu reserva, solicitamos un depósito del 30%. El saldo restante puede pagarse hasta 48 horas antes del tour, o en efectivo el día del tour.'
                },
                {
                    q: '¿Cuál es la política de cancelación?',
                    a: 'Cancelación gratuita hasta 48 horas antes del tour con reembolso completo. Cancelaciones con menos de 48 horas tienen un cargo del 50%. No hay reembolso por no presentarse (no-show).'
                }
            ]
        },
        {
            category: 'Antes del Viaje',
            questions: [
                {
                    q: '¿Cuál es la mejor época para visitar Cusco?',
                    a: 'La temporada seca (mayo a septiembre) es ideal con días soleados y noches frías. La temporada de lluvias (diciembre a marzo) tiene menos turistas pero más lluvia. Abril y octubre son meses de transición con buen clima.'
                },
                {
                    q: '¿Necesito aclimatar me a la altura?',
                    a: 'Sí, muy importante. Cusco está a 3,400 msnm. Recomendamos llegar 2-3 días antes de tours exigentes. Descansa el primer día, toma mate de coca, hidrátate bien y evita alcohol y comidas pesadas.'
                },
                {
                    q: '¿Qué debo llevar en mi equipaje?',
                    a: 'Ropa en capas (hace frío en la mañana/noche, calor al mediodía), bloqueador solar SPF 50+, sombrero, gafas de sol, repelente de insectos, botella de agua reutilizable, y medicamentos personales. Para treks: mochila, bastones, sleeping bag.'
                },
                {
                    q: '¿Necesito vacunas especiales?',
                    a: 'No hay vacunas obligatorias para Cusco. Si planeas visitar la selva (Manu, Tambopata), se recomienda vacuna contra fiebre amarilla. Consulta con tu médico antes de viajar.'
                }
            ]
        },
        {
            category: 'Durante el Tour',
            questions: [
                {
                    q: '¿Los tours incluyen comidas?',
                    a: 'Depende del tour. Los tours de día completo generalmente incluyen almuerzo. Los treks de varios días incluyen todas las comidas. Revisa la sección "Incluido" en cada tour para detalles específicos.'
                },
                {
                    q: '¿Qué pasa si tengo restricciones alimentarias?',
                    a: 'Podemos acomodar dietas vegetarianas, veganas, sin gluten y alergias alimentarias. Solo indícalo en el formulario de reserva o avísanos con anticipación.'
                },
                {
                    q: '¿Los guías hablan inglés?',
                    a: 'Sí, todos nuestros guías son bilingües (español/inglés). También ofrecemos guías en francés, alemán y portugués bajo pedido con reserva anticipada.'
                },
                {
                    q: '¿Qué tan grandes son los grupos?',
                    a: 'Mantenemos grupos pequeños de máximo 15 personas para una experiencia más personalizada. Para tours privados, puedes reservar solo para tu grupo.'
                },
                {
                    q: '¿Qué pasa si llueve?',
                    a: 'Los tours operan con lluvia o sol (excepto condiciones extremas peligrosas). Lleva poncho impermeable. Si el tour se cancela por mal clima, ofrecemos reprogramación o reembolso completo.'
                }
            ]
        },
        {
            category: 'Tours Específicos',
            questions: [
                {
                    q: '¿Necesito permiso especial para Machu Picchu?',
                    a: 'Sí, se requiere entrada anticipada. Los cupos son limitados (especialmente para Huayna Picchu). Recomendamos reservar con 2-3 meses de anticipación en temporada alta (junio-agosto).'
                },
                {
                    q: '¿Qué tan difícil es el Camino Inca?',
                    a: 'Es moderado a difícil. Requiere buena condición física. Caminarás 4 días, hasta 16km diarios, con altitudes de 2,700m a 4,215m. Aclimatación previa es esencial.'
                },
                {
                    q: '¿Puedo hacer Rainbow Mountain si no estoy en forma?',
                    a: 'Es desafiante (5,200 msnm). Si no estás en buena forma, considera Palcoyo (alternativa más fácil). Hay caballos disponibles para alquiler ($25) que te llevan el 70% del camino.'
                },
                {
                    q: '¿La ceremonia de Ayahuasca es segura?',
                    a: 'Sí, trabajamos con chamanes experimentados y certificados. Sin embargo, no es apto para personas con problemas cardíacos, embarazadas, o tomando ciertos medicamentos (SSRIs, MAOIs). Consulta médica previa es obligatoria.'
                }
            ]
        },
        {
            category: 'Logística',
            questions: [
                {
                    q: '¿Dónde nos recogen?',
                    a: 'Recogemos en hoteles del centro de Cusco sin costo adicional. Para hoteles fuera del centro, puede haber cargo extra o punto de encuentro designado.'
                },
                {
                    q: '¿Qué pasa si mi vuelo se retrasa?',
                    a: 'Contáctanos inmediatamente. Haremos lo posible por acomodarte. Si pierdes el tour por retraso de vuelo, podemos reprogramar (sujeto a disponibilidad) sin cargo adicional.'
                },
                {
                    q: '¿Puedo dejar equipaje en su oficina?',
                    a: 'Sí, ofrecemos almacenamiento gratuito de equipaje en nuestra oficina para clientes que hacen tours con nosotros.'
                },
                {
                    q: '¿Tienen seguro de viaje?',
                    a: 'Todos nuestros tours incluyen seguro básico de accidentes. Recomendamos contratar seguro de viaje personal que cubra cancelaciones, emergencias médicas y evacuación.'
                }
            ]
        },
        {
            category: 'Otros',
            questions: [
                {
                    q: '¿Puedo tomar fotos en los sitios arqueológicos?',
                    a: 'Sí, fotos personales están permitidas en la mayoría de sitios. No se permite trípodes profesionales sin permiso especial. En algunos museos está prohibido usar flash.'
                },
                {
                    q: '¿Hay WiFi en los tours?',
                    a: 'En la ciudad y pueblos hay WiFi. En treks y sitios remotos no hay señal. Te recomendamos desconectarte y disfrutar la experiencia.'
                },
                {
                    q: '¿Puedo comprar artesanías en los tours?',
                    a: 'Sí, visitamos mercados artesanales donde puedes comprar directamente de artesanos locales. Lleva efectivo en soles para mejores precios.'
                },
                {
                    q: '¿Dan propina a los guías?',
                    a: 'Las propinas no son obligatorias pero son apreciadas si disfrutaste el servicio. El promedio es $5-10 USD por persona por día para guías, y $3-5 USD para conductores.'
                }
            ]
        }
    ]

    const toggleQuestion = (categoryIndex, questionIndex) => {
        const index = `${categoryIndex}-${questionIndex}`
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO
                title="Preguntas Frecuentes"
                description="Respuestas a las dudas más comunes sobre nuestros tours en Cusco, reservas, pagos y logística de viaje."
            />
            {/* Hero Section */}
            <section className="relative h-80 bg-gradient-to-br from-mountain-blue via-sacred-purple to-mystic-teal">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
                            Preguntas Frecuentes
                        </h1>
                        <p className="text-xl text-white/90">
                            Encuentra respuestas a las dudas más comunes sobre nuestros tours
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Quick Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6 mb-12 bg-gradient-to-r from-blue-50 to-purple-50"
                >
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                            ¿No encuentras tu respuesta?
                        </h3>
                        <p className="text-slate-600 mb-4">
                            Estamos aquí para ayudarte 24/7
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="https://wa.me/51984123456"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                            >
                                <span>💬</span> WhatsApp
                            </a>
                            <a
                                href="mailto:info@myagencia.com"
                                className="bg-sacred-purple hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                            >
                                <span>📧</span> Email
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ Categories */}
                {faqs.map((category, categoryIndex) => (
                    <motion.section
                        key={categoryIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.1 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-display font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-sacred-purple to-mystic-teal rounded-full" />
                            {category.category}
                        </h2>
                        <div className="space-y-4">
                            {category.questions.map((item, questionIndex) => {
                                const index = `${categoryIndex}-${questionIndex}`
                                const isOpen = openIndex === index

                                return (
                                    <div key={questionIndex} className="card overflow-hidden">
                                        <button
                                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                                            className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                                        >
                                            <h3 className="text-lg font-semibold text-slate-800 pr-4">
                                                {item.q}
                                            </h3>
                                            <span className={`text-2xl text-sacred-purple transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                                                ▼
                                            </span>
                                        </button>
                                        <motion.div
                                            initial={false}
                                            animate={{ height: isOpen ? 'auto' : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                                {item.a}
                                            </div>
                                        </motion.div>
                                    </div>
                                )
                            })}
                        </div>
                    </motion.section>
                ))}

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="card p-8 text-center bg-gradient-to-r from-sacred-purple to-mystic-teal text-white"
                >
                    <h3 className="text-2xl font-display font-bold mb-4">
                        ¿Listo para Reservar?
                    </h3>
                    <p className="text-lg mb-6 text-white/90">
                        Explora nuestros tours y encuentra tu próxima aventura
                    </p>
                    <a
                        href="/tours"
                        className="inline-block bg-white text-sacred-purple px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-colors"
                    >
                        Ver Todos los Tours
                    </a>
                </motion.div>
            </div>
        </div>
    )
}
