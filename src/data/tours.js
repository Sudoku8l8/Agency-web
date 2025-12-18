// Tour data structure
export const tours = [
    {
        id: 1,
        title: 'Valle Sagrado Completo',
        slug: 'valle-sagrado-completo',
        category: 'Arqueología',
        price: 120,
        duration: 'Full Day',
        difficulty: 'Fácil',
        groupSize: '2-15 personas',
        image: '/tour-valle.jpg',
        gallery: ['/tour-valle.jpg', '/hero-cusco.jpg', '/tour-machu.jpg'],
        shortDescription: 'Explora Pisac, Ollantaytambo y Moray en un día inolvidable',
        description: 'Descubre los secretos del Valle Sagrado de los Incas en este tour completo que te llevará a través de los sitios arqueológicos más impresionantes de la región. Visitarás Pisac con sus increíbles terrazas agrícolas, el pueblo y fortaleza de Ollantaytambo, y las enigmáticas terrazas circulares de Moray.',
        highlights: [
            'Ruinas arqueológicas de Pisac',
            'Mercado artesanal de Pisac',
            'Fortaleza de Ollantaytambo',
            'Terrazas circulares de Moray',
            'Salineras de Maras',
            'Almuerzo buffet incluido'
        ],
        included: [
            'Transporte turístico',
            'Guía profesional bilingüe',
            'Entradas a todos los sitios',
            'Almuerzo buffet',
            'Agua mineral'
        ],
        notIncluded: [
            'Propinas',
            'Bebidas alcohólicas',
            'Gastos personales'
        ],
        itinerary: [
            { time: '07:00', activity: 'Recojo del hotel', description: 'Nuestro guía te recogerá de tu hotel en Cusco' },
            { time: '09:00', activity: 'Pisac', description: 'Visita al sitio arqueológico y mercado artesanal' },
            { time: '12:00', activity: 'Almuerzo', description: 'Buffet con comida típica peruana' },
            { time: '14:00', activity: 'Ollantaytambo', description: 'Exploración de la fortaleza inca' },
            { time: '16:00', activity: 'Moray y Maras', description: 'Terrazas agrícolas y salineras' },
            { time: '18:30', activity: 'Retorno', description: 'Regreso a Cusco y drop-off en hotel' }
        ],
        recommendations: [
            'Llevar protector solar y sombrero',
            'Ropa cómoda y zapatos para caminar',
            'Cámara fotográfica',
            'Dinero en efectivo para compras'
        ],
        reviews: [
            {
                name: 'María González',
                location: 'Madrid, España',
                rating: 5,
                comment: '¡Increíble experiencia! El guía fue muy conocedor y apasionado por la historia inca. Las ruinas de Pisac son impresionantes y el almuerzo estuvo delicioso. Totalmente recomendado.',
                date: '2024-11-10',
                tourDate: '2024-11-05',
                verified: true
            },
            {
                name: 'John Smith',
                location: 'New York, USA',
                rating: 5,
                comment: 'Best tour in Cusco! Our guide spoke perfect English and was very informative. The Sacred Valley is breathtaking. Don\'t miss Ollantaytambo!',
                date: '2024-11-15',
                tourDate: '2024-11-12',
                verified: true
            },
            {
                name: 'Sophie Dubois',
                location: 'Paris, France',
                rating: 4,
                comment: 'Très belle journée! Les sites sont magnifiques. Seul bémol: un peu trop de temps dans le marché artisanal. Mais je recommande quand même!',
                date: '2024-10-28',
                tourDate: '2024-10-25',
                verified: true
            },
            {
                name: 'Carlos Mendoza',
                location: 'Buenos Aires, Argentina',
                rating: 5,
                comment: 'Excelente tour, muy completo. Las explicaciones del guía fueron fascinantes. Las Salineras de Maras son un espectáculo único. Vale cada centavo.',
                date: '2024-11-01',
                tourDate: '2024-10-30',
                verified: true
            },
            {
                name: 'Emma Wilson',
                location: 'London, UK',
                rating: 4,
                comment: 'Really enjoyed this tour. The ruins are spectacular and well-preserved. Would have liked more time at each site, but overall a great experience.',
                date: '2024-10-20',
                tourDate: '2024-10-18',
                verified: true
            }
        ],
        averageRating: 4.6,
        totalReviews: 5
    },
    {
        id: 2,
        title: 'Canotaje en Urubamba',
        slug: 'canotaje-urubamba',
        category: 'Aventura',
        price: 85,
        duration: '4 horas',
        difficulty: 'Moderado',
        groupSize: '4-12 personas',
        image: '/tour-rafting.jpg',
        gallery: ['/tour-rafting.jpg', '/hero-rafting.jpg', '/tour-valle.jpg'],
        shortDescription: 'Adrenalina pura en las aguas cristalinas del río sagrado',
        description: 'Experimenta la emoción del rafting en el río Urubamba, conocido como el río sagrado de los Incas. Navegarás a través de rápidos clase II-III mientras disfrutas de impresionantes vistas de las montañas andinas. Perfecto para principiantes y aventureros experimentados.',
        highlights: [
            'Rápidos clase II-III',
            'Vistas espectaculares del Valle Sagrado',
            'Equipo de seguridad certificado',
            'Guías expertos',
            'Snack y bebidas incluidas'
        ],
        included: [
            'Transporte desde/hacia Cusco',
            'Equipo completo de rafting',
            'Guía especializado',
            'Traje de neopreno',
            'Casco y chaleco salvavidas',
            'Snack y agua'
        ],
        notIncluded: [
            'Ropa de cambio',
            'Toalla',
            'Propinas'
        ],
        itinerary: [
            { time: '08:00', activity: 'Recojo', description: 'Recojo de tu hotel en Cusco' },
            { time: '09:30', activity: 'Briefing de seguridad', description: 'Instrucciones y equipamiento' },
            { time: '10:00', activity: 'Inicio del rafting', description: '2 horas de navegación por el río' },
            { time: '12:00', activity: 'Snack', description: 'Refrigerio y descanso' },
            { time: '13:00', activity: 'Retorno', description: 'Regreso a Cusco' }
        ],
        recommendations: [
            'Saber nadar (requisito obligatorio)',
            'Llevar ropa de cambio',
            'Toalla',
            'Bloqueador solar resistente al agua',
            'No llevar objetos de valor'
        ],
        reviews: [
            {
                name: 'Carlos Ruiz',
                location: 'Lima, Perú',
                rating: 5,
                comment: '¡Adrenalina pura! Los guías fueron muy profesionales y nos sentimos seguros todo el tiempo. El paisaje es increíble.',
                date: '2024-11-20',
                tourDate: '2024-11-18',
                verified: true
            },
            {
                name: 'Sarah Jenkins',
                location: 'Toronto, Canada',
                rating: 5,
                comment: 'So much fun! The rapids were exciting but not too scary. Great lunch afterwards too.',
                date: '2024-10-15',
                tourDate: '2024-10-12',
                verified: true
            },
            {
                name: 'Miguel Ángel',
                location: 'Santiago, Chile',
                rating: 4,
                comment: 'Muy buena experiencia. El agua estaba helada pero con el traje no se siente tanto. Recomendado.',
                date: '2024-09-30',
                tourDate: '2024-09-28',
                verified: true
            },
            {
                name: 'Anna Müller',
                location: 'Berlin, Germany',
                rating: 5,
                comment: 'Best rafting experience I have had. The river is beautiful and the team is top notch.',
                date: '2024-11-05',
                tourDate: '2024-11-02',
                verified: true
            }
        ],
        averageRating: 4.8,
        totalReviews: 4
    },
    {
        id: 3,
        title: 'Ceremonia de Ayahuasca',
        slug: 'ceremonia-ayahuasca',
        category: 'Místico',
        price: 200,
        duration: 'Noche completa',
        difficulty: 'Espiritual',
        groupSize: '4-10 personas',
        image: '/tour-ayahuasca.jpg',
        gallery: ['/tour-ayahuasca.jpg', '/hero-ceremony.jpg', '/tour-valle.jpg'],
        shortDescription: 'Conexión espiritual guiada por chamanes ancestrales',
        description: 'Participa en una auténtica ceremonia de Ayahuasca dirigida por chamanes experimentados en un entorno seguro y sagrado. Esta experiencia transformadora te permitirá conectar con tu interior y la sabiduría ancestral andina. Incluye preparación previa, ceremonia nocturna y integración post-ceremonia.',
        highlights: [
            'Ceremonia auténtica con chamán tradicional',
            'Preparación y dieta previa',
            'Entorno seguro y sagrado',
            'Sesión de integración',
            'Grupo pequeño e íntimo',
            'Alojamiento incluido'
        ],
        included: [
            'Consulta previa con el chamán',
            'Ceremonia completa de Ayahuasca',
            'Alojamiento en centro ceremonial',
            'Comidas vegetarianas (cena y desayuno)',
            'Sesión de integración al día siguiente',
            'Transporte desde/hacia Cusco'
        ],
        notIncluded: [
            'Medicamentos personales',
            'Seguro médico'
        ],
        itinerary: [
            { time: '15:00', activity: 'Recojo y traslado', description: 'Transporte al centro ceremonial' },
            { time: '16:00', activity: 'Preparación', description: 'Consulta con el chamán y preparación espiritual' },
            { time: '18:00', activity: 'Cena ligera', description: 'Comida vegetariana preparada especialmente' },
            { time: '20:00', activity: 'Inicio de ceremonia', description: 'Ceremonia de Ayahuasca (4-6 horas)' },
            { time: '02:00', activity: 'Descanso', description: 'Tiempo para descansar y procesar' },
            { time: '09:00', activity: 'Desayuno', description: 'Desayuno vegetariano' },
            { time: '10:00', activity: 'Integración', description: 'Círculo de compartir experiencias' },
            { time: '12:00', activity: 'Retorno', description: 'Regreso a Cusco' }
        ],
        recommendations: [
            'Seguir dieta previa (sin alcohol, carnes rojas, picante)',
            'Consultar condiciones médicas con anticipación',
            'Llevar ropa cómoda y abrigadora',
            'Linterna',
            'Botella de agua',
            'Mente abierta y respeto por la tradición'
        ],
        restrictions: [
            'No apto para personas con problemas cardíacos',
            'No compatible con ciertos medicamentos (SSRIs, MAOIs)',
            'No recomendado para embarazadas',
            'Consulta médica previa obligatoria'
        ],
        reviews: [
            {
                name: 'David Brown',
                location: 'Austin, USA',
                rating: 5,
                comment: 'Life changing experience. The shaman was very respectful and the setting was perfect. I felt safe the whole time.',
                date: '2024-11-10',
                tourDate: '2024-11-08',
                verified: true
            },
            {
                name: 'Elena Rossi',
                location: 'Rome, Italy',
                rating: 5,
                comment: 'Una esperienza profonda e spirituale. Grazie per tutto.',
                date: '2024-10-25',
                tourDate: '2024-10-22',
                verified: true
            },
            {
                name: 'Juan Pérez',
                location: 'Bogotá, Colombia',
                rating: 5,
                comment: 'Muy intenso pero sanador. La preparación y la integración fueron claves. Gracias al equipo.',
                date: '2024-09-15',
                tourDate: '2024-09-12',
                verified: true
            }
        ],
        averageRating: 5.0,
        totalReviews: 3
    },
    {
        id: 4,
        title: 'Cabalgata Andina',
        slug: 'cabalgata-andina',
        category: 'Naturaleza',
        price: 95,
        duration: '6 horas',
        difficulty: 'Moderado',
        groupSize: '2-8 personas',
        image: '/tour-horse.jpg',
        gallery: ['/tour-horse.jpg', '/tour-valle.jpg', '/hero-cusco.jpg'],
        shortDescription: 'Recorre paisajes de ensueño a caballo por las montañas',
        description: 'Explora los paisajes andinos a caballo en esta aventura única. Cabalgarás por senderos tradicionales, visitarás comunidades locales y disfrutarás de vistas panorámicas impresionantes de las montañas y valles. Los caballos son de raza peruana de paso, conocidos por su suavidad y resistencia.',
        highlights: [
            'Caballos peruanos de paso',
            'Vistas panorámicas de los Andes',
            'Visita a comunidad local',
            'Almuerzo campestre',
            'Guía experto en equitación',
            'Paisajes vírgenes'
        ],
        included: [
            'Transporte desde/hacia Cusco',
            'Caballo y equipo completo',
            'Guía especializado',
            'Almuerzo campestre',
            'Visita a comunidad andina',
            'Poncho tradicional (si hace frío)'
        ],
        notIncluded: [
            'Propinas',
            'Bebidas adicionales'
        ],
        itinerary: [
            { time: '07:00', activity: 'Recojo', description: 'Recojo de tu hotel en Cusco' },
            { time: '08:30', activity: 'Llegada al rancho', description: 'Conoce a tu caballo y briefing' },
            { time: '09:00', activity: 'Inicio de cabalgata', description: 'Cabalgata por senderos andinos' },
            { time: '11:00', activity: 'Visita a comunidad', description: 'Interacción con familia local' },
            { time: '12:30', activity: 'Almuerzo', description: 'Almuerzo campestre con vista panorámica' },
            { time: '14:00', activity: 'Retorno a caballo', description: 'Regreso al rancho por ruta diferente' },
            { time: '15:30', activity: 'Retorno a Cusco', description: 'Transporte de regreso' }
        ],
        recommendations: [
            'Pantalones largos cómodos',
            'Zapatos cerrados (no sandalias)',
            'Chaqueta cortavientos',
            'Protector solar y gafas de sol',
            'Cámara fotográfica',
            'Experiencia previa en equitación no necesaria'
        ],
        reviews: [
            {
                name: 'Lucía Fernández',
                location: 'Valencia, España',
                rating: 5,
                comment: 'Los caballos son hermosos y muy dóciles. El paisaje es de película. Una forma diferente de ver Cusco.',
                date: '2024-11-12',
                tourDate: '2024-11-10',
                verified: true
            },
            {
                name: 'Mike Johnson',
                location: 'Sydney, Australia',
                rating: 4,
                comment: 'Great ride. The horses are well cared for. Lunch was simple but tasty.',
                date: '2024-10-05',
                tourDate: '2024-10-02',
                verified: true
            },
            {
                name: 'Isabella Silva',
                location: 'Rio de Janeiro, Brazil',
                rating: 5,
                comment: 'Maravilhoso! As vistas são incríveis. Recomendo muito.',
                date: '2024-11-01',
                tourDate: '2024-10-29',
                verified: true
            }
        ],
        averageRating: 4.7,
        totalReviews: 3
    },
    {
        id: 5,
        title: 'Machu Picchu Express',
        slug: 'machu-picchu-express',
        category: 'Arqueología',
        price: 280,
        duration: '2 días / 1 noche',
        difficulty: 'Fácil',
        groupSize: '2-20 personas',
        image: '/tour-machu.jpg',
        gallery: ['/tour-machu.jpg', '/tour-valle.jpg', '/hero-cusco.jpg'],
        shortDescription: 'Visita la maravilla del mundo en tren de lujo',
        description: 'Experimenta Machu Picchu de la manera más cómoda con nuestro tour express. Viaja en tren panorámico, pasa la noche en Aguas Calientes y disfruta de un tour guiado completo por la ciudadela inca al amanecer, cuando hay menos turistas.',
        highlights: [
            'Tren panorámico Vistadome',
            'Tour guiado en Machu Picchu',
            'Entrada al amanecer',
            'Hotel 3 estrellas en Aguas Calientes',
            'Grupos pequeños',
            'Desayuno y cena incluidos'
        ],
        included: [
            'Tren Vistadome ida y vuelta',
            'Bus Aguas Calientes - Machu Picchu',
            'Entrada a Machu Picchu',
            'Guía profesional (2 horas)',
            'Hotel 3* en Aguas Calientes',
            'Desayuno y cena',
            'Asistencia 24/7'
        ],
        notIncluded: [
            'Almuerzo día 2',
            'Propinas',
            'Gastos personales',
            'Entrada a Huayna Picchu (opcional, +$20)'
        ],
        itinerary: [
            { time: 'Día 1 - 06:00', activity: 'Recojo en Cusco', description: 'Transporte a estación de tren' },
            { time: '08:00', activity: 'Tren a Aguas Calientes', description: 'Viaje panorámico de 3.5 horas' },
            { time: '12:00', activity: 'Llegada y check-in', description: 'Instalación en hotel' },
            { time: '13:00', activity: 'Tarde libre', description: 'Explora Aguas Calientes, baños termales opcionales' },
            { time: '19:00', activity: 'Cena', description: 'Cena en restaurante local' },
            { time: 'Día 2 - 05:30', activity: 'Bus a Machu Picchu', description: 'Subida a la ciudadela' },
            { time: '06:00', activity: 'Tour guiado', description: 'Recorrido completo de 2-3 horas' },
            { time: '09:00', activity: 'Tiempo libre', description: 'Explora por tu cuenta' },
            { time: '12:00', activity: 'Retorno', description: 'Bus de bajada y almuerzo libre' },
            { time: '14:30', activity: 'Tren a Cusco', description: 'Retorno en tren' },
            { time: '18:00', activity: 'Llegada a Cusco', description: 'Transfer a hotel' }
        ],
        recommendations: [
            'Pasaporte original (obligatorio)',
            'Mochila pequeña',
            'Ropa en capas',
            'Impermeable',
            'Protector solar',
            'Repelente de insectos',
            'Dinero en efectivo',
            'Reservar con anticipación (cupos limitados)'
        ],
        reviews: [
            {
                name: 'Robert Chen',
                location: 'San Francisco, USA',
                rating: 5,
                comment: 'Everything was perfectly organized. The train ride is beautiful and seeing Machu Picchu at sunrise is magical.',
                date: '2024-11-18',
                tourDate: '2024-11-15',
                verified: true
            },
            {
                name: 'Ana Martínez',
                location: 'Mexico City, Mexico',
                rating: 5,
                comment: 'Vale totalmente la pena. El hotel en Aguas Calientes muy cómodo y el guía excelente.',
                date: '2024-10-30',
                tourDate: '2024-10-28',
                verified: true
            },
            {
                name: 'Thomas Weber',
                location: 'Munich, Germany',
                rating: 5,
                comment: 'Perfekt organisiert. Der Guide war sehr kompetent.',
                date: '2024-11-05',
                tourDate: '2024-11-02',
                verified: true
            }
        ],
        averageRating: 5.0,
        totalReviews: 3
    },
    {
        id: 6,
        title: 'Trekking Laguna Humantay',
        slug: 'trekking-laguna-humantay',
        category: 'Aventura',
        price: 75,
        duration: 'Full Day',
        difficulty: 'Moderado-Difícil',
        groupSize: '4-15 personas',
        image: '/tour-humantay.jpg',
        gallery: ['/tour-humantay.jpg', '/tour-valle.jpg', '/tour-machu.jpg'],
        shortDescription: 'Caminata a la impresionante laguna turquesa de alta montaña',
        description: 'Desafía tus límites en esta caminata de alta montaña hacia la espectacular Laguna Humantay, ubicada a 4,200 msnm. Sus aguas turquesas rodeadas de picos nevados crean un paisaje de otro mundo. Una experiencia física y espiritualmente gratificante.',
        highlights: [
            'Laguna Humantay (4,200 msnm)',
            'Vistas del nevado Salkantay',
            'Paisajes de alta montaña',
            'Desayuno y almuerzo incluidos',
            'Bastones de trekking',
            'Caballos disponibles (costo extra)'
        ],
        included: [
            'Transporte turístico',
            'Guía profesional',
            'Desayuno y almuerzo',
            'Entrada a la laguna',
            'Bastones de trekking',
            'Botiquín de primeros auxilios',
            'Oxígeno de emergencia'
        ],
        notIncluded: [
            'Caballo para subida (opcional, $20)',
            'Propinas',
            'Bebidas adicionales'
        ],
        itinerary: [
            { time: '04:30', activity: 'Recojo', description: 'Recojo de hoteles en Cusco' },
            { time: '06:30', activity: 'Desayuno', description: 'Desayuno en Mollepata' },
            { time: '07:30', activity: 'Inicio de caminata', description: 'Trekking de 1.5-2 horas (ascenso)' },
            { time: '09:30', activity: 'Laguna Humantay', description: 'Tiempo libre para fotos y apreciación' },
            { time: '11:00', activity: 'Descenso', description: 'Retorno al punto de inicio' },
            { time: '12:30', activity: 'Almuerzo', description: 'Almuerzo buffet' },
            { time: '14:00', activity: 'Retorno', description: 'Viaje de regreso a Cusco' },
            { time: '17:00', activity: 'Llegada', description: 'Llegada a Cusco' }
        ],
        recommendations: [
            'Buena condición física',
            'Aclimatación previa (mínimo 2 días en Cusco)',
            'Ropa de trekking',
            'Chaqueta impermeable',
            'Gorro y guantes',
            'Bloqueador solar',
            'Agua (1-2 litros)',
            'Snacks energéticos',
            'Cámara fotográfica'
        ],
        reviews: [
            {
                name: 'Jessica Lee',
                location: 'Singapore',
                rating: 5,
                comment: 'Tough hike but the view is worth every step. The lake color is unreal!',
                date: '2024-11-15',
                tourDate: '2024-11-13',
                verified: true
            },
            {
                name: 'Pedro Santos',
                location: 'Lisbon, Portugal',
                rating: 4,
                comment: 'La altura pega fuerte, pero es hermoso. Recomiendo alquilar caballo si no están en forma.',
                date: '2024-10-20',
                tourDate: '2024-10-18',
                verified: true
            },
            {
                name: 'Emily Clark',
                location: 'Vancouver, Canada',
                rating: 5,
                comment: 'Stunning scenery. Breakfast and lunch were delicious too.',
                date: '2024-11-01',
                tourDate: '2024-10-30',
                verified: true
            }
        ],
        averageRating: 4.7,
        totalReviews: 3
    },
    {
        id: 7,
        title: 'Rainbow Mountain (Vinicunca)',
        slug: 'rainbow-mountain-vinicunca',
        category: 'Aventura',
        price: 80,
        duration: 'Full Day',
        difficulty: 'Difícil',
        groupSize: '4-20 personas',
        image: '/tour-valle.jpg',
        gallery: ['/tour-valle.jpg', '/hero-cusco.jpg', '/tour-humantay.jpg'],
        shortDescription: 'Montaña de 7 colores a 5,200 msnm - paisaje surrealista',
        description: 'Descubre uno de los fenómenos naturales más impresionantes del Perú: la Montaña de 7 Colores o Vinicunca. Esta caminata desafiante te llevará a 5,200 msnm donde presenciarás un espectáculo de colores naturales creados por minerales. Una experiencia única que combina desafío físico con belleza natural incomparable.',
        highlights: [
            'Montaña de 7 colores (5,200 msnm)',
            'Paisaje de alta montaña',
            'Vistas del nevado Ausangate',
            'Desayuno y almuerzo buffet',
            'Caballos disponibles',
            'Grupos pequeños'
        ],
        included: [
            'Transporte turístico',
            'Guía profesional bilingüe',
            'Desayuno y almuerzo buffet',
            'Entrada al sitio',
            'Bastones de trekking',
            'Oxígeno de emergencia',
            'Botiquín de primeros auxilios'
        ],
        notIncluded: [
            'Caballo (opcional, $25)',
            'Propinas',
            'Bebidas adicionales'
        ],
        itinerary: [
            { time: '04:00', activity: 'Recojo', description: 'Recojo de hoteles en Cusco' },
            { time: '06:30', activity: 'Desayuno', description: 'Desayuno buffet en ruta' },
            { time: '08:00', activity: 'Inicio de caminata', description: 'Trekking de 2-3 horas (ascenso)' },
            { time: '10:30', activity: 'Rainbow Mountain', description: 'Tiempo libre para fotos' },
            { time: '12:00', activity: 'Descenso', description: 'Retorno al punto de inicio' },
            { time: '13:30', activity: 'Almuerzo', description: 'Almuerzo buffet' },
            { time: '15:00', activity: 'Retorno', description: 'Viaje de regreso a Cusco' },
            { time: '18:00', activity: 'Llegada', description: 'Llegada a Cusco' }
        ],
        recommendations: [
            'Excelente condición física requerida',
            'Aclimatación mínima de 3 días',
            'Ropa de montaña en capas',
            'Chaqueta impermeable',
            'Gorro, guantes y bufanda',
            'Bloqueador solar SPF 50+',
            'Agua (2 litros mínimo)',
            'Snacks energéticos'
        ],
        reviews: [
            {
                name: 'James Wilson',
                location: 'London, UK',
                rating: 5,
                comment: 'Hardest thing I have ever done but the view is incredible. The colors are real!',
                date: '2024-11-22',
                tourDate: '2024-11-20',
                verified: true
            },
            {
                name: 'Maria Garcia',
                location: 'Madrid, Spain',
                rating: 4,
                comment: 'Muy bonito pero mucha gente. Recomiendo ir muy temprano.',
                date: '2024-10-15',
                tourDate: '2024-10-12',
                verified: true
            },
            {
                name: 'Kenji Tanaka',
                location: 'Tokyo, Japan',
                rating: 5,
                comment: 'Beautiful landscape. The altitude is serious, take it slow.',
                date: '2024-11-05',
                tourDate: '2024-11-03',
                verified: true
            }
        ],
        averageRating: 4.7,
        totalReviews: 3
    },
    {
        id: 8,
        title: 'City Tour Cusco + Sacsayhuamán',
        slug: 'city-tour-cusco',
        category: 'Arqueología',
        price: 45,
        duration: '5 horas',
        difficulty: 'Fácil',
        groupSize: '2-15 personas',
        image: '/hero-cusco.jpg',
        gallery: ['/hero-cusco.jpg', '/tour-valle.jpg', '/tour-machu.jpg'],
        shortDescription: 'Explora el centro histórico y las ruinas cercanas',
        description: 'Descubre la magia de Cusco, la antigua capital del Imperio Inca. Este tour te llevará por el centro histórico colonial, la Catedral, Qoricancha (Templo del Sol) y las impresionantes ruinas de Sacsayhuamán, Q\'enqo, Puca Pucara y Tambomachay. Perfecto para tu primer día en Cusco.',
        highlights: [
            'Plaza de Armas de Cusco',
            'Catedral del Cusco',
            'Qoricancha - Templo del Sol',
            'Fortaleza de Sacsayhuamán',
            'Q\'enqo, Puca Pucara y Tambomachay',
            'Guía experto en historia inca'
        ],
        included: [
            'Transporte turístico',
            'Guía profesional bilingüe',
            'Entradas a todos los sitios',
            'Recojo y retorno al hotel'
        ],
        notIncluded: [
            'Boleto Turístico (S/70 soles)',
            'Entrada a la Catedral (S/25 soles)',
            'Propinas'
        ],
        itinerary: [
            { time: '13:00', activity: 'Recojo', description: 'Recojo de hoteles en el centro' },
            { time: '13:30', activity: 'Qoricancha', description: 'Visita al Templo del Sol' },
            { time: '14:30', activity: 'Catedral', description: 'Tour por la Catedral' },
            { time: '15:30', activity: 'Sacsayhuamán', description: 'Fortaleza megalítica' },
            { time: '16:30', activity: 'Q\'enqo y Puca Pucara', description: 'Sitios ceremoniales' },
            { time: '17:30', activity: 'Tambomachay', description: 'Baños del Inca' },
            { time: '18:00', activity: 'Retorno', description: 'Regreso a hoteles' }
        ],
        recommendations: [
            'Llevar Boleto Turístico o comprarlo',
            'Protector solar',
            'Sombrero o gorra',
            'Cámara fotográfica',
            'Agua',
            'Ideal para el primer día en Cusco'
        ],
        reviews: [
            {
                name: 'Sofia Rossi',
                location: 'Milan, Italy',
                rating: 5,
                comment: 'Cusco è bellissima. Il tour copre tutti i punti importanti.',
                date: '2024-11-18',
                tourDate: '2024-11-16',
                verified: true
            },
            {
                name: 'John Doe',
                location: 'Chicago, USA',
                rating: 4,
                comment: 'Good overview of the city. Sacsayhuaman is massive!',
                date: '2024-10-25',
                tourDate: '2024-10-23',
                verified: true
            },
            {
                name: 'Ana Lopez',
                location: 'Lima, Peru',
                rating: 5,
                comment: 'Excelente guía, muy didáctico. Aprendimos mucho sobre la historia inca.',
                date: '2024-11-10',
                tourDate: '2024-11-08',
                verified: true
            }
        ],
        averageRating: 4.7,
        totalReviews: 3
    },
    {
        id: 9,
        title: 'Camino Inca Clásico 4D/3N',
        slug: 'camino-inca-clasico',
        category: 'Aventura',
        price: 650,
        duration: '4 días / 3 noches',
        difficulty: 'Difícil',
        groupSize: '2-16 personas',
        image: '/tour-machu.jpg',
        gallery: ['/tour-machu.jpg', '/tour-valle.jpg', '/hero-cusco.jpg'],
        shortDescription: 'La ruta de trekking más famosa del mundo',
        description: 'Recorre el legendario Camino Inca, la misma ruta que usaban los incas para llegar a Machu Picchu. 4 días de trekking a través de paisajes espectaculares, ruinas incas y bosque nublado, culminando con la llegada a Machu Picchu por la Puerta del Sol al amanecer. Una experiencia transformadora.',
        highlights: [
            'Trekking por el Camino Inca original',
            'Campamentos en sitios espectaculares',
            'Ruinas incas en la ruta',
            'Llegada a Machu Picchu por Inti Punku',
            'Porteadores y cocinero incluidos',
            'Equipo de camping completo'
        ],
        included: [
            'Permiso oficial del Camino Inca',
            'Guía profesional certificado',
            'Porteadores (7kg por persona)',
            'Cocinero y todas las comidas',
            'Carpas dobles',
            'Colchonetas',
            'Entrada a Machu Picchu',
            'Tren de retorno Aguas Calientes-Ollantaytambo',
            'Bus Aguas Calientes-Machu Picchu'
        ],
        notIncluded: [
            'Sleeping bag (alquiler $20)',
            'Bastones de trekking (alquiler $15)',
            'Propinas para equipo',
            'Seguro de viaje'
        ],
        itinerary: [
            { time: 'Día 1', activity: 'Km 82 - Wayllabamba', description: '12km, 6 horas de caminata, campamento a 3,000m' },
            { time: 'Día 2', activity: 'Paso Warmiwañusca', description: '11km, 7 horas, paso más alto 4,215m' },
            { time: 'Día 3', activity: 'Wiñay Wayna', description: '16km, 8 horas, ruinas espectaculares' },
            { time: 'Día 4', activity: 'Machu Picchu', description: 'Llegada al amanecer, tour guiado, retorno a Cusco' }
        ],
        recommendations: [
            'Reservar con 6 meses de anticipación',
            'Excelente condición física',
            'Aclimatación de 3-4 días en Cusco',
            'Sleeping bag para -10°C',
            'Ropa de trekking técnica',
            'Bastones de trekking',
            'Linterna frontal',
            'Pasaporte original obligatorio'
        ],
        reviews: [
            {
                name: 'Emma Thompson',
                location: 'Sydney, Australia',
                rating: 5,
                comment: 'Bucket list item checked! The porters are superheroes. The food was amazing for camping.',
                date: '2024-11-15',
                tourDate: '2024-11-11',
                verified: true
            },
            {
                name: 'Lucas Silva',
                location: 'Sao Paulo, Brazil',
                rating: 5,
                comment: 'Incrível. Chegar a Machu Picchu pelo Portal do Sol não tem preço.',
                date: '2024-10-20',
                tourDate: '2024-10-16',
                verified: true
            },
            {
                name: 'Marie Dubois',
                location: 'Lyon, France',
                rating: 5,
                comment: 'Magnifique. Une expérience inoubliable.',
                date: '2024-11-01',
                tourDate: '2024-10-28',
                verified: true
            }
        ],
        averageRating: 5.0,
        totalReviews: 3
    },
    {
        id: 10,
        title: 'Tour Gastronómico Cusco',
        slug: 'tour-gastronomico-cusco',
        category: 'Cultura',
        price: 65,
        duration: '4 horas',
        difficulty: 'Fácil',
        groupSize: '4-12 personas',
        image: '/tour-valle.jpg',
        gallery: ['/tour-valle.jpg', '/hero-cusco.jpg', '/tour-machu.jpg'],
        shortDescription: 'Degusta los sabores auténticos de la cocina peruana',
        description: 'Embárcate en un viaje culinario por Cusco. Visita el mercado San Pedro, prueba platos tradicionales, aprende sobre ingredientes andinos y disfruta de una experiencia gastronómica completa. Incluye degustación de pisco, chicha y platos típicos. Perfecto para foodies.',
        highlights: [
            'Mercado San Pedro',
            'Degustación de 8+ platos típicos',
            'Pisco sour y chicha morada',
            'Frutas exóticas andinas',
            'Chocolate peruano',
            'Restaurante local auténtico'
        ],
        included: [
            'Guía gastronómico experto',
            'Todas las degustaciones',
            'Bebidas (pisco, chicha, café)',
            'Almuerzo completo',
            'Recetario digital'
        ],
        notIncluded: [
            'Propinas',
            'Compras personales en el mercado'
        ],
        itinerary: [
            { time: '10:00', activity: 'Mercado San Pedro', description: 'Tour por el mercado tradicional' },
            { time: '11:00', activity: 'Degustaciones', description: 'Frutas, quesos, panes andinos' },
            { time: '12:00', activity: 'Pisco y chicha', description: 'Bebidas tradicionales' },
            { time: '12:30', activity: 'Almuerzo', description: 'Restaurante local - 3 platos' },
            { time: '13:30', activity: 'Chocolate y café', description: 'Degustación final' },
            { time: '14:00', activity: 'Fin del tour', description: 'Retorno o tiempo libre' }
        ],
        recommendations: [
            'Venir con hambre',
            'Mencionar alergias alimentarias',
            'Cámara para fotos',
            'Dinero en efectivo para compras',
            'Mente abierta para probar cosas nuevas'
        ],
        reviews: [
            {
                name: 'Oliver Smith',
                location: 'London, UK',
                rating: 5,
                comment: 'Delicious food! The market tour was fascinating. Highly recommend for foodies.',
                date: '2024-11-20',
                tourDate: '2024-11-18',
                verified: true
            },
            {
                name: 'Carla Gomez',
                location: 'Mexico City, Mexico',
                rating: 4,
                comment: 'Muy rico todo. El ceviche de trucha estaba espectacular.',
                date: '2024-10-15',
                tourDate: '2024-10-13',
                verified: true
            },
            {
                name: 'Hans Muller',
                location: 'Berlin, Germany',
                rating: 5,
                comment: 'Great introduction to Peruvian cuisine. The pisco sour class was fun.',
                date: '2024-11-05',
                tourDate: '2024-11-03',
                verified: true
            }
        ],
        averageRating: 4.7,
        totalReviews: 3
    },
    {
        id: 11,
        title: 'Maras y Moray + Salineras',
        slug: 'maras-moray-salineras',
        category: 'Arqueología',
        price: 55,
        duration: '5 horas',
        difficulty: 'Fácil',
        groupSize: '2-15 personas',
        image: '/tour-valle.jpg',
        gallery: ['/tour-valle.jpg', '/hero-cusco.jpg', '/tour-machu.jpg'],
        shortDescription: 'Terrazas incas y minas de sal milenarias',
        description: 'Descubre dos de los sitios más fotogénicos del Valle Sagrado. Las terrazas circulares de Moray, un laboratorio agrícola inca, y las impresionantes Salineras de Maras con más de 3,000 pozas de sal explotadas desde tiempos pre-incas. Un tour corto pero inolvidable.',
        highlights: [
            'Terrazas circulares de Moray',
            'Salineras de Maras (3,000+ pozas)',
            'Pueblo colonial de Maras',
            'Vistas del Valle Sagrado',
            'Compra de sal rosa artesanal',
            'Fotografías espectaculares'
        ],
        included: [
            'Transporte turístico',
            'Guía profesional',
            'Entradas a Moray y Salineras',
            'Tiempo para compras'
        ],
        notIncluded: [
            'Almuerzo',
            'Propinas'
        ],
        itinerary: [
            { time: '08:00', activity: 'Recojo', description: 'Recojo de hoteles en Cusco' },
            { time: '09:30', activity: 'Moray', description: 'Visita a las terrazas circulares' },
            { time: '11:00', activity: 'Salineras de Maras', description: 'Caminata por las pozas de sal' },
            { time: '12:30', activity: 'Pueblo de Maras', description: 'Tiempo libre y compras' },
            { time: '13:00', activity: 'Retorno', description: 'Regreso a Cusco' }
        ],
        recommendations: [
            'Zapatos cómodos para caminar',
            'Protector solar',
            'Sombrero',
            'Cámara fotográfica',
            'Dinero para comprar sal artesanal',
            'Puede combinarse con otros tours'
        ],
        reviews: [
            {
                name: 'Sarah Jones',
                location: 'New York, USA',
                rating: 5,
                comment: 'The salt mines are incredible. Great photo opportunities.',
                date: '2024-11-12',
                tourDate: '2024-11-10',
                verified: true
            },
            {
                name: 'Pedro Martinez',
                location: 'Barcelona, Spain',
                rating: 4,
                comment: 'Muy interesante. Moray es impresionante.',
                date: '2024-10-28',
                tourDate: '2024-10-26',
                verified: true
            },
            {
                name: 'Yuki Tanaka',
                location: 'Osaka, Japan',
                rating: 5,
                comment: 'Beautiful landscape. Short tour but worth it.',
                date: '2024-11-01',
                tourDate: '2024-10-30',
                verified: true
            }
        ],
        averageRating: 4.7,
        totalReviews: 3
    },
    {
        id: 12,
        title: 'Salkantay Trek 5D/4N',
        slug: 'salkantay-trek',
        category: 'Aventura',
        price: 420,
        duration: '5 días / 4 noches',
        difficulty: 'Difícil',
        groupSize: '4-12 personas',
        image: '/tour-humantay.jpg',
        gallery: ['/tour-humantay.jpg', '/tour-valle.jpg', '/tour-machu.jpg'],
        shortDescription: 'Ruta alternativa a Machu Picchu por montañas nevadas',
        description: 'El Salkantay Trek es considerado uno de los 25 mejores treks del mundo. Atraviesa diversos ecosistemas desde glaciares a 4,650m hasta selva tropical, culminando en Machu Picchu. Una alternativa espectacular al Camino Inca sin necesidad de permiso.',
        highlights: [
            'Paso Salkantay (4,650 msnm)',
            'Nevado Salkantay y Humantay',
            'Bosque nublado y selva',
            'Aguas termales en Santa Teresa',
            'Machu Picchu al final',
            'Campamentos espectaculares'
        ],
        included: [
            'Guía profesional',
            'Porteadores y cocinero',
            'Todas las comidas',
            'Carpas y equipo de camping',
            'Entrada a Machu Picchu',
            'Tren de retorno',
            'Transporte Cusco-inicio del trek'
        ],
        notIncluded: [
            'Sleeping bag (alquiler $20)',
            'Bastones (alquiler $15)',
            'Caballo personal (opcional)',
            'Propinas'
        ],
        itinerary: [
            { time: 'Día 1', activity: 'Soraypampa', description: 'Laguna Humantay opcional, campamento 3,900m' },
            { time: 'Día 2', activity: 'Paso Salkantay', description: 'Punto más alto 4,650m, descenso a Chaullay' },
            { time: 'Día 3', activity: 'Bosque nublado', description: 'Caminata por selva, campamento en La Playa' },
            { time: 'Día 4', activity: 'Aguas Calientes', description: 'Llaqtapata, aguas termales, hotel' },
            { time: 'Día 5', activity: 'Machu Picchu', description: 'Tour guiado, retorno a Cusco' }
        ],
        recommendations: [
            'Buena condición física',
            'Aclimatación de 2-3 días',
            'Ropa para frío y calor',
            'Sleeping bag -10°C',
            'Repelente de insectos',
            'Traje de baño (aguas termales)',
            'Bastones de trekking'
        ],
        reviews: [
            {
                name: 'Paul Anderson',
                location: 'Seattle, USA',
                rating: 5,
                comment: 'The Salkantay pass was tough but rewarding. The cloud forest section is beautiful.',
                date: '2024-11-18',
                tourDate: '2024-11-13',
                verified: true
            },
            {
                name: 'Laura Martinez',
                location: 'Santiago, Chile',
                rating: 5,
                comment: 'Increíble experiencia. Los domos en el campamento son muy cómodos.',
                date: '2024-10-30',
                tourDate: '2024-10-25',
                verified: true
            },
            {
                name: 'Kevin O\'Connor',
                location: 'Dublin, Ireland',
                rating: 5,
                comment: 'Great alternative to the Inca Trail. Less crowded and more scenic.',
                date: '2024-11-05',
                tourDate: '2024-10-31',
                verified: true
            }
        ],
        averageRating: 5.0,
        totalReviews: 3
    },
    {
        id: 13,
        title: 'Choquequirao Trek 4D/3N',
        slug: 'choquequirao-trek',
        category: 'Aventura',
        price: 380,
        duration: '4 días / 3 noches',
        difficulty: 'Muy Difícil',
        groupSize: '2-10 personas',
        image: '/tour-machu.jpg',
        gallery: ['/tour-machu.jpg', '/tour-valle.jpg', '/hero-cusco.jpg'],
        shortDescription: 'La hermana sagrada de Machu Picchu - sin turistas',
        description: 'Choquequirao, "Cuna de Oro", es una ciudadela inca tan impresionante como Machu Picchu pero con menos del 1% de visitantes. Este trek desafiante te lleva a través del Cañón del Apurímac a uno de los sitios arqueológicos más remotos y mejor preservados del Perú.',
        highlights: [
            'Ciudadela de Choquequirao',
            'Cañón del Apurímac',
            'Ruinas sin multitudes',
            'Cóndores andinos',
            'Paisajes vírgenes',
            'Aventura auténtica'
        ],
        included: [
            'Guía profesional',
            'Porteadores y cocinero',
            'Todas las comidas',
            'Equipo de camping',
            'Entrada a Choquequirao',
            'Transporte Cusco-Cachora-Cusco'
        ],
        notIncluded: [
            'Sleeping bag (alquiler $20)',
            'Bastones (alquiler $15)',
            'Propinas',
            'Seguro de viaje'
        ],
        itinerary: [
            { time: 'Día 1', activity: 'Cachora - Chiquisca', description: '18km, descenso al cañón' },
            { time: 'Día 2', activity: 'Choquequirao', description: 'Ascenso y exploración de ruinas' },
            { time: 'Día 3', activity: 'Más ruinas', description: 'Sectores altos, inicio de retorno' },
            { time: 'Día 4', activity: 'Retorno a Cusco', description: 'Ascenso final y transporte' }
        ],
        recommendations: [
            'Excelente condición física (muy exigente)',
            'Aclimatación de 3-4 días',
            'Bastones obligatorios',
            'Rodilleras recomendadas',
            'Protector solar SPF 50+',
            'Repelente de insectos',
            'Solo para aventureros experimentados'
        ],
        reviews: [
            {
                name: 'Mark Stevens',
                location: 'Denver, USA',
                rating: 5,
                comment: 'A true adventure. We were the only ones at the ruins. Magical.',
                date: '2024-11-10',
                tourDate: '2024-11-06',
                verified: true
            },
            {
                name: 'Pierre Dupont',
                location: 'Bordeaux, France',
                rating: 5,
                comment: 'Très dur mais ça vaut le coup. Le site est immense.',
                date: '2024-10-15',
                tourDate: '2024-10-11',
                verified: true
            },
            {
                name: 'Ricardo Gomez',
                location: 'Lima, Peru',
                rating: 5,
                comment: 'La verdadera joya perdida de los Incas. El trekking es exigente.',
                date: '2024-09-20',
                tourDate: '2024-09-16',
                verified: true
            }
        ],
        averageRating: 5.0,
        totalReviews: 3
    },
    {
        id: 14,
        title: 'Montaña de Palcoyo',
        slug: 'montana-palcoyo',
        category: 'Naturaleza',
        price: 70,
        duration: 'Full Day',
        difficulty: 'Moderado',
        groupSize: '4-15 personas',
        image: '/tour-valle.jpg',
        gallery: ['/tour-valle.jpg', '/hero-cusco.jpg', '/tour-humantay.jpg'],
        shortDescription: 'Alternativa a Rainbow Mountain - menos caminata, igual belleza',
        description: 'Palcoyo es la alternativa perfecta a Vinicunca para quienes buscan montañas de colores con menos esfuerzo físico. Solo 1 hora de caminata fácil te lleva a 3 montañas de colores, bosque de piedras y vistas del Ausangate. Menos turistas, más tranquilidad.',
        highlights: [
            'Tres montañas de colores',
            'Bosque de piedras',
            'Vistas del Ausangate',
            'Caminata corta (1 hora)',
            'Menos turistas que Vinicunca',
            'Ideal para todas las edades'
        ],
        included: [
            'Transporte turístico',
            'Guía profesional',
            'Desayuno y almuerzo',
            'Entrada al sitio',
            'Bastones de trekking'
        ],
        notIncluded: [
            'Propinas',
            'Bebidas adicionales'
        ],
        itinerary: [
            { time: '05:00', activity: 'Recojo', description: 'Recojo de hoteles' },
            { time: '07:30', activity: 'Desayuno', description: 'Desayuno en ruta' },
            { time: '09:00', activity: 'Inicio de caminata', description: 'Caminata suave de 1 hora' },
            { time: '10:00', activity: 'Montañas de colores', description: 'Tiempo libre para fotos' },
            { time: '11:30', activity: 'Bosque de piedras', description: 'Exploración' },
            { time: '12:30', activity: 'Retorno', description: 'Descenso y almuerzo' },
            { time: '15:00', activity: 'Regreso', description: 'Retorno a Cusco' },
            { time: '17:30', activity: 'Llegada', description: 'Llegada a Cusco' }
        ],
        recommendations: [
            'Aclimatación de 2 días',
            'Ropa abrigadora',
            'Protector solar',
            'Agua',
            'Snacks',
            'Ideal para familias y personas mayores'
        ],
        reviews: [
            {
                name: 'Susan Miller',
                location: 'Florida, USA',
                rating: 5,
                comment: 'Perfect for us since we are not big hikers. The views are amazing.',
                date: '2024-11-22',
                tourDate: '2024-11-20',
                verified: true
            },
            {
                name: 'Carlos Fernandez',
                location: 'Buenos Aires, Argentina',
                rating: 4,
                comment: 'Muy lindo y accesible. El bosque de piedras es un plus.',
                date: '2024-10-28',
                tourDate: '2024-10-26',
                verified: true
            },
            {
                name: 'Akira Sato',
                location: 'Kyoto, Japan',
                rating: 5,
                comment: 'Great alternative to Vinicunca. Very peaceful.',
                date: '2024-11-05',
                tourDate: '2024-11-03',
                verified: true
            }
        ],
        averageRating: 4.7,
        totalReviews: 3
    },
    {
        id: 15,
        title: 'Quad/ATV Valle Sagrado',
        slug: 'quad-atv-valle-sagrado',
        category: 'Aventura',
        price: 90,
        duration: '4 horas',
        difficulty: 'Moderado',
        groupSize: '2-10 personas',
        image: '/tour-valle.jpg',
        gallery: ['/tour-valle.jpg', '/hero-cusco.jpg', '/tour-rafting.jpg'],
        shortDescription: 'Adrenalina en cuatrimoto por paisajes andinos',
        description: 'Explora el Valle Sagrado de una manera diferente: en cuatrimoto. Recorre caminos de tierra, cruza ríos, visita Moray y las Salineras de Maras mientras disfrutas de la adrenalina y las vistas espectaculares. Incluye equipo de seguridad y guía experto.',
        highlights: [
            'Cuatrimotos automáticas',
            'Moray y Salineras',
            'Caminos off-road',
            'Vistas panorámicas',
            'Equipo de seguridad incluido',
            'No se requiere experiencia'
        ],
        included: [
            'Cuatrimoto automática',
            'Casco y guantes',
            'Guía en cuatrimoto',
            'Entradas a sitios',
            'Transporte Cusco-punto de inicio',
            'Briefing de seguridad'
        ],
        notIncluded: [
            'Almuerzo',
            'Propinas',
            'Fotos/videos profesionales (opcional)'
        ],
        itinerary: [
            { time: '08:00', activity: 'Recojo', description: 'Transporte al punto de inicio' },
            { time: '09:00', activity: 'Briefing', description: 'Instrucciones y práctica' },
            { time: '09:30', activity: 'Inicio del tour', description: 'Ruta por el Valle Sagrado' },
            { time: '10:30', activity: 'Moray', description: 'Visita rápida' },
            { time: '11:30', activity: 'Salineras', description: 'Parada fotográfica' },
            { time: '12:30', activity: 'Retorno', description: 'Regreso a Cusco' }
        ],
        recommendations: [
            'Licencia de conducir no requerida',
            'Ropa que pueda ensuciarse',
            'Zapatos cerrados',
            'Gafas de sol',
            'Bloqueador solar',
            'Cámara GoPro (opcional)'
        ],
        reviews: [
            {
                name: 'Tom Baker',
                location: 'Manchester, UK',
                rating: 5,
                comment: 'So much fun! The ATVs are powerful and easy to drive.',
                date: '2024-11-15',
                tourDate: '2024-11-13',
                verified: true
            },
            {
                name: 'Valentina Rossi',
                location: 'Rome, Italy',
                rating: 4,
                comment: 'Divertente. Moray è molto interessante.',
                date: '2024-10-20',
                tourDate: '2024-10-18',
                verified: true
            },
            {
                name: 'Juan Torres',
                location: 'Bogota, Colombia',
                rating: 5,
                comment: 'Excelente tour de aventura. Recomendado 100%.',
                date: '2024-11-01',
                tourDate: '2024-10-30',
                verified: true
            }
        ],
        averageRating: 4.7,
        totalReviews: 3
    },
    {
        id: 16,
        title: 'Tour Nocturno Místico',
        slug: 'tour-nocturno-mistico',
        category: 'Místico',
        price: 55,
        duration: '3 horas',
        difficulty: 'Fácil',
        groupSize: '4-12 personas',
        image: '/hero-ceremony.jpg',
        gallery: ['/hero-ceremony.jpg', '/hero-cusco.jpg', '/tour-valle.jpg'],
        shortDescription: 'Descubre el Cusco mágico bajo las estrellas',
        description: 'Experimenta Cusco de noche con este tour místico que combina historia, leyendas y energía andina. Visita sitios sagrados iluminados, participa en una ceremonia de ofrenda a la Pachamama y aprende sobre cosmovisión andina. Incluye bebida de coca caliente y snacks.',
        highlights: [
            'Cusco iluminado de noche',
            'Ceremonia a la Pachamama',
            'Leyendas y mitos incas',
            'Sitios energéticos',
            'Mate de coca ceremonial',
            'Grupos pequeños e íntimos'
        ],
        included: [
            'Guía místico especializado',
            'Ceremonia de ofrenda',
            'Mate de coca y snacks',
            'Transporte',
            'Manta andina (si hace frío)'
        ],
        notIncluded: [
            'Propinas',
            'Compras personales'
        ],
        itinerary: [
            { time: '19:00', activity: 'Recojo', description: 'Recojo de hoteles' },
            { time: '19:30', activity: 'Plaza de Armas', description: 'Leyendas del centro histórico' },
            { time: '20:15', activity: 'Sacsayhuamán', description: 'Ceremonia bajo las estrellas' },
            { time: '21:15', activity: 'Mirador', description: 'Vista nocturna de Cusco' },
            { time: '21:45', activity: 'Mate de coca', description: 'Cierre ceremonial' },
            { time: '22:00', activity: 'Retorno', description: 'Regreso a hoteles' }
        ],
        recommendations: [
            'Ropa abrigadora',
            'Mente abierta',
            'Respeto por tradiciones',
            'Cámara (fotos sin flash)',
            'Ideal para conectar con energía andina'
        ],
        reviews: [
            {
                name: 'Elena Popov',
                location: 'Moscow, Russia',
                rating: 5,
                comment: 'Very spiritual and atmospheric. Seeing Cusco at night is special.',
                date: '2024-11-18',
                tourDate: '2024-11-16',
                verified: true
            },
            {
                name: 'Jorge Martinez',
                location: 'Quito, Ecuador',
                rating: 5,
                comment: 'La ceremonia fue muy emotiva. El guía sabe mucho.',
                date: '2024-10-25',
                tourDate: '2024-10-23',
                verified: true
            },
            {
                name: 'Sophie Martin',
                location: 'Paris, France',
                rating: 4,
                comment: 'Une belle découverte. Très différent des autres tours.',
                date: '2024-11-10',
                tourDate: '2024-11-08',
                verified: true
            }
        ],
        averageRating: 4.7,
        totalReviews: 3
    }
]

// Helper functions
export const getTourById = (id) => {
    return tours.find(tour => tour.id === parseInt(id))
}

export const getFeaturedTours = () => {
    // Return specific tours or just the first 4
    // Let's pick a mix of categories: Valle Sagrado (1), Rafting (2), Ayahuasca (3), Horse (4)
    return tours.filter(tour => [1, 2, 3, 4].includes(tour.id))
}
export const getTourBySlug = (slug) => tours.find(tour => tour.slug === slug)
export const getToursByCategory = (category) => tours.filter(tour => tour.category === category)
export const getAllCategories = () => [...new Set(tours.map(tour => tour.category))]
