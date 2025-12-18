import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { createBooking } from '../services/bookingsService'
import toast from 'react-hot-toast'

export default function Checkout() {
    const navigate = useNavigate()
    const [bookingData, setBookingData] = useState(null)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        passport: '',
        hotel: '',
        dietaryRestrictions: '',
        specialRequests: '',
        paymentMethod: 'transfer',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: ''
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        const savedBooking = localStorage.getItem('currentBooking')
        if (savedBooking) {
            setBookingData(JSON.parse(savedBooking))
        }
    }, [])

    const validateForm = () => {
        const newErrors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

        if (!formData.firstName.trim() || formData.firstName.length < 2) {
            newErrors.firstName = 'El nombre es obligatorio (mínimo 2 caracteres)'
        }
        if (!formData.lastName.trim() || formData.lastName.length < 2) {
            newErrors.lastName = 'El apellido es obligatorio (mínimo 2 caracteres)'
        }
        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = 'Ingresa un email válido'
        }
        if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Ingresa un teléfono válido (ej. +51 999 999 999)'
        }
        if (!formData.passport.trim() || formData.passport.length < 6) {
            newErrors.passport = 'El pasaporte es obligatorio (mínimo 6 caracteres)'
        }

        if (formData.paymentMethod === 'card') {
            if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
                newErrors.cardNumber = 'Número de tarjeta inválido (16 dígitos)'
            }
            if (!formData.cardExpiry || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
                newErrors.cardExpiry = 'Formato MM/YY requerido'
            }
            if (!formData.cardCvc || formData.cardCvc.length < 3) {
                newErrors.cardCvc = 'CVC inválido (3 dígitos)'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        let formattedValue = value

        // Format card number with spaces
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})/g, '$1 ').trim()
        }
        // Format expiry date
        if (name === 'cardExpiry') {
            formattedValue = value.replace(/\D/g, '').substring(0, 4).replace(/^(\d{2})/, '$1/')
            if (formattedValue.endsWith('/')) formattedValue = formattedValue.substring(0, 3)
        }
        // Limit CVC
        if (name === 'cardCvc') {
            formattedValue = value.replace(/\D/g, '').substring(0, 3)
        }

        setFormData({
            ...formData,
            [name]: formattedValue
        })

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            const firstError = document.querySelector('.text-red-500')
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
        }

        setIsSubmitting(true)

        const booking = {
            ...bookingData,
            customerInfo: { ...formData, cardNumber: '****', cardCvc: '***' },
            status: 'pending'
        }

        const result = await createBooking(booking)

        if (result.success) {
            localStorage.removeItem('currentBooking')
            setShowSuccess(true)
            setTimeout(() => {
                navigate('/')
            }, 4000)
        } else {
            toast.error('Error al procesar la reserva: ' + result.error)
        }

        setIsSubmitting(false)
    }

    if (!bookingData) {
        return (
            <div className="min-h-screen py-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold text-slate-700 mb-4">No hay reserva activa</h1>
                    <p className="text-slate-600 mb-6">Selecciona un tour primero</p>
                    <Link to="/tours" className="btn-primary">Ver Tours</Link>
                </div>
            </div>
        )
    }

    if (showSuccess) {
        return (
            <div className="min-h-screen py-20 flex items-center justify-center bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="card p-12 max-w-2xl text-center"
                >
                    <div className="text-6xl mb-6">✅</div>
                    <h1 className="text-4xl font-display font-bold text-green-600 mb-4">¡Reserva Confirmada!</h1>
                    <p className="text-xl text-slate-600 mb-6">
                        Hemos recibido tu solicitud de reserva para <strong>{bookingData.tour.title}</strong>
                    </p>
                    <div className="bg-blue-50 p-6 rounded-lg mb-6">
                        <p className="text-slate-700">
                            Te enviaremos un correo de confirmación a <strong>{formData.email}</strong> con todos los detalles.
                        </p>
                    </div>
                    <p className="text-slate-500 text-sm">Redirigiendo a la página principal...</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-display font-bold text-center mb-12 text-gradient"
                >
                    Finalizar Reserva
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card p-6 sticky top-24"
                        >
                            <h2 className="text-2xl font-display font-bold mb-6">Resumen de Reserva</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-slate-800">{bookingData.tour.title}</h3>
                                    <p className="text-sm text-slate-600">{bookingData.tour.category}</p>
                                </div>
                                <div className="border-t border-slate-200 pt-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-slate-600">Fecha:</span>
                                        <span className="font-semibold text-sm">{new Date(bookingData.date).toLocaleDateString('es-ES')}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-slate-600">Personas:</span>
                                        <span className="font-semibold">{bookingData.numPeople}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-slate-600">Precio/persona:</span>
                                        <span className="font-semibold">${bookingData.tour.price}</span>
                                    </div>
                                </div>
                                <div className="border-t border-slate-200 pt-4">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span>Total:</span>
                                        <span className="text-sacred-purple">${bookingData.totalPrice}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="card p-8"
                        >
                            <h2 className="text-2xl font-display font-bold mb-6">Información del Viajero</h2>
                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-sacred-purple'}`}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Apellido *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-sacred-purple'}`}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.lastName}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-sacred-purple'}`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+51 999 999 999"
                                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-sacred-purple'}`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Pasaporte *</label>
                                        <input
                                            type="text"
                                            name="passport"
                                            value={formData.passport}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition-colors ${errors.passport ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-sacred-purple'}`}
                                        />
                                        {errors.passport && <p className="text-red-500 text-xs mt-1 font-medium">{errors.passport}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Hotel en Cusco</label>
                                        <input type="text" name="hotel" value={formData.hotel} onChange={handleInputChange} placeholder="Para el recojo" className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Restricciones Alimentarias</label>
                                    <input type="text" name="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleInputChange} placeholder="Vegetariano, vegano, alergias..." className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Solicitudes Especiales</label>
                                    <textarea name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} rows="4" placeholder="Información adicional..." className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none" />
                                </div>

                                <div className="border-t border-slate-200 pt-6">
                                    <h3 className="text-xl font-display font-bold mb-4">Método de Pago</h3>
                                    <div className="space-y-4">
                                        {/* Transfer Option */}
                                        <label className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'transfer' ? 'border-sacred-purple bg-purple-50' : 'border-slate-200 hover:border-sacred-purple'}`}>
                                            <input type="radio" name="paymentMethod" value="transfer" checked={formData.paymentMethod === 'transfer'} onChange={handleInputChange} className="mt-1 w-4 h-4 text-sacred-purple focus:ring-sacred-purple" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-slate-800">Transferencia Bancaria</div>
                                                <div className="text-sm text-slate-600 mb-2">Realiza una transferencia a nuestra cuenta BCP.</div>
                                                {formData.paymentMethod === 'transfer' && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className="bg-white p-4 rounded border border-slate-200 text-sm space-y-2"
                                                    >
                                                        <p><strong>Banco:</strong> BCP</p>
                                                        <p><strong>Cuenta:</strong> 193-12345678-0-01</p>
                                                        <p><strong>CCI:</strong> 002-193-12345678001-12</p>
                                                        <p><strong>Titular:</strong> MyAgencia SAC</p>
                                                        <p className="text-xs text-slate-500 mt-2">Envía el comprobante a pagos@myagencia.com</p>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </label>

                                        {/* Card Option */}
                                        <label className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-sacred-purple bg-purple-50' : 'border-slate-200 hover:border-sacred-purple'}`}>
                                            <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} className="mt-1 w-4 h-4 text-sacred-purple focus:ring-sacred-purple" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-slate-800">Tarjeta de Crédito/Débito</div>
                                                <div className="text-sm text-slate-600 mb-2">Pago seguro con Visa o Mastercard.</div>
                                                {formData.paymentMethod === 'card' && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        className="bg-white p-4 rounded border border-slate-200 space-y-4"
                                                    >
                                                        <div>
                                                            <label className="block text-xs font-semibold text-slate-600 mb-1">Número de Tarjeta</label>
                                                            <input
                                                                type="text"
                                                                name="cardNumber"
                                                                value={formData.cardNumber}
                                                                onChange={handleInputChange}
                                                                placeholder="0000 0000 0000 0000"
                                                                maxLength="19"
                                                                className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.cardNumber ? 'border-red-500' : 'border-slate-300 focus:border-sacred-purple'}`}
                                                            />
                                                            {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="block text-xs font-semibold text-slate-600 mb-1">Expiración (MM/YY)</label>
                                                                <input
                                                                    type="text"
                                                                    name="cardExpiry"
                                                                    value={formData.cardExpiry}
                                                                    onChange={handleInputChange}
                                                                    placeholder="MM/YY"
                                                                    maxLength="5"
                                                                    className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.cardExpiry ? 'border-red-500' : 'border-slate-300 focus:border-sacred-purple'}`}
                                                                />
                                                                {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-semibold text-slate-600 mb-1">CVC</label>
                                                                <input
                                                                    type="text"
                                                                    name="cardCvc"
                                                                    value={formData.cardCvc}
                                                                    onChange={handleInputChange}
                                                                    placeholder="123"
                                                                    maxLength="3"
                                                                    className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.cardCvc ? 'border-red-500' : 'border-slate-300 focus:border-sacred-purple'}`}
                                                                />
                                                                {errors.cardCvc && <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </label>

                                        {/* PayPal Option */}
                                        <label className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'paypal' ? 'border-sacred-purple bg-purple-50' : 'border-slate-200 hover:border-sacred-purple'}`}>
                                            <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleInputChange} className="mt-1 w-4 h-4 text-sacred-purple focus:ring-sacred-purple" />
                                            <div className="flex-1">
                                                <div className="font-semibold text-slate-800">PayPal</div>
                                                <div className="text-sm text-slate-600">Serás redirigido a PayPal para completar el pago.</div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" required className="mt-1 w-4 h-4 text-sacred-purple focus:ring-sacred-purple" />
                                        <span className="text-sm text-slate-700">
                                            He leído y acepto los <a href="#" className="text-sacred-purple hover:underline font-medium">términos y condiciones</a> y la política de cancelación.
                                        </span>
                                    </label>
                                </div>

                                <button type="submit" disabled={isSubmitting} className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </span>
                                    ) : 'Confirmar Reserva'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
