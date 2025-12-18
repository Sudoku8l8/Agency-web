import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { subscribeToBookings, updateBookingStatus as updateBookingStatusInDB } from '../services/bookingsService'
import ToursList from '../components/admin/ToursList'
import ReviewsList from '../components/admin/ReviewsList'
import DataMigration from '../components/admin/DataMigration'

export default function Admin() {
    const [activeTab, setActiveTab] = useState('bookings')
    const [bookings, setBookings] = useState([])
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [filter, setFilter] = useState('all')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Subscribe to real-time updates from Firestore
        const unsubscribe = subscribeToBookings((updatedBookings) => {
            setBookings(updatedBookings)
            setLoading(false)
        })

        // Cleanup subscription on unmount
        return () => unsubscribe()
    }, [])

    const updateBookingStatus = async (bookingId, newStatus) => {
        const result = await updateBookingStatusInDB(bookingId, newStatus)
        if (result.success) {
            // Update local state immediately for better UX
            const updatedBookings = bookings.map(booking =>
                booking.id === bookingId ? { ...booking, status: newStatus } : booking
            )
            setBookings(updatedBookings)
            if (selectedBooking && selectedBooking.id === bookingId) {
                setSelectedBooking({ ...selectedBooking, status: newStatus })
            }
        } else {
            alert('Error al actualizar el estado: ' + result.error)
        }
    }

    const deleteBooking = (bookingId) => {
        if (confirm('¿Estás seguro de eliminar esta reserva?')) {
            updateBookingStatus(bookingId, 'cancelled')
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'confirmed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800',
            'completed': 'bg-blue-100 text-blue-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const getStatusLabel = (status) => {
        const labels = {
            'pending': 'Pendiente',
            'confirmed': 'Confirmada',
            'cancelled': 'Cancelada',
            'completed': 'Completada'
        }
        return labels[status] || status
    }

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status === filter)

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        revenue: bookings
            .filter(b => b.status === 'confirmed' || b.status === 'completed')
            .reduce((sum, b) => sum + b.totalPrice, 0)
    }

    if (loading && activeTab === 'bookings') {
        return (
            <div className="min-h-screen bg-slate-100 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sacred-purple mx-auto mb-4"></div>
                    <p className="text-slate-600">Cargando reservas...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-display font-bold text-gradient mb-2">Panel de Administración</h1>
                    <p className="text-slate-600">Gestiona las reservas, tours y visualiza estadísticas</p>
                </motion.div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-slate-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'bookings'
                                    ? 'border-sacred-purple text-sacred-purple'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                            >
                                📋 Reservas
                            </button>
                            <button
                                onClick={() => setActiveTab('tours')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'tours'
                                    ? 'border-sacred-purple text-sacred-purple'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                            >
                                🗺️ Tours
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'reviews'
                                    ? 'border-sacred-purple text-sacred-purple'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                    }`}
                            >
                                ⭐ Reseñas
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'bookings' ? (
                    <div>
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="card p-6"
                            >
                                <div className="text-sm text-slate-600 mb-1">Total Reservas</div>
                                <div className="text-3xl font-bold text-slate-800">{stats.total}</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="card p-6"
                            >
                                <div className="text-sm text-slate-600 mb-1">Pendientes</div>
                                <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="card p-6"
                            >
                                <div className="text-sm text-slate-600 mb-1">Confirmadas</div>
                                <div className="text-3xl font-bold text-green-600">{stats.confirmed}</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="card p-6"
                            >
                                <div className="text-sm text-slate-600 mb-1">Ingresos</div>
                                <div className="text-3xl font-bold text-sacred-purple">${stats.revenue}</div>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Bookings List */}
                            <div className="lg:col-span-2">
                                <div className="card p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-display font-bold">Reservas</h2>
                                        <select
                                            value={filter}
                                            onChange={(e) => setFilter(e.target.value)}
                                            className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                        >
                                            <option value="all">Todas</option>
                                            <option value="pending">Pendientes</option>
                                            <option value="confirmed">Confirmadas</option>
                                            <option value="completed">Completadas</option>
                                            <option value="cancelled">Canceladas</option>
                                        </select>
                                    </div>

                                    {filteredBookings.length === 0 ? (
                                        <div className="text-center py-12 text-slate-500">
                                            <div className="text-6xl mb-4">📋</div>
                                            <p>No hay reservas {filter !== 'all' && `con estado "${getStatusLabel(filter)}"`}</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {filteredBookings.map((booking) => (
                                                <motion.div
                                                    key={booking.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    onClick={() => setSelectedBooking(booking)}
                                                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${selectedBooking?.id === booking.id
                                                        ? 'border-sacred-purple bg-purple-50'
                                                        : 'border-slate-200 hover:border-slate-300'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-slate-800">{booking.tour.title}</h3>
                                                            <p className="text-sm text-slate-600">
                                                                {booking.customerInfo.firstName} {booking.customerInfo.lastName}
                                                            </p>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                                                            {getStatusLabel(booking.status)}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm text-slate-600">
                                                        <span>📅 {new Date(booking.date).toLocaleDateString('es-ES')}</span>
                                                        <span>👥 {booking.numPeople} personas</span>
                                                        <span className="font-bold text-sacred-purple">${booking.totalPrice}</span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Booking Detail */}
                            <div className="lg:col-span-1">
                                {selectedBooking ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="card p-6 sticky top-24"
                                    >
                                        <h2 className="text-2xl font-display font-bold mb-6">Detalle de Reserva</h2>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="font-semibold text-slate-700 mb-1">Tour</h3>
                                                <p className="text-slate-900">{selectedBooking.tour.title}</p>
                                                <p className="text-sm text-slate-600">{selectedBooking.tour.category}</p>
                                            </div>

                                            <div className="border-t border-slate-200 pt-4">
                                                <h3 className="font-semibold text-slate-700 mb-2">Cliente</h3>
                                                <p className="text-slate-900">
                                                    {selectedBooking.customerInfo.firstName} {selectedBooking.customerInfo.lastName}
                                                </p>
                                                <p className="text-sm text-slate-600">{selectedBooking.customerInfo.email}</p>
                                                <p className="text-sm text-slate-600">{selectedBooking.customerInfo.phone}</p>
                                                <p className="text-sm text-slate-600">Pasaporte: {selectedBooking.customerInfo.passport}</p>
                                                {selectedBooking.customerInfo.hotel && (
                                                    <p className="text-sm text-slate-600">Hotel: {selectedBooking.customerInfo.hotel}</p>
                                                )}
                                            </div>

                                            <div className="border-t border-slate-200 pt-4">
                                                <h3 className="font-semibold text-slate-700 mb-2">Detalles</h3>
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Fecha:</span>
                                                        <span className="font-medium">{new Date(selectedBooking.date).toLocaleDateString('es-ES')}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Personas:</span>
                                                        <span className="font-medium">{selectedBooking.numPeople}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Total:</span>
                                                        <span className="font-bold text-sacred-purple">${selectedBooking.totalPrice}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-600">Pago:</span>
                                                        <span className="font-medium capitalize">{selectedBooking.customerInfo.paymentMethod}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {selectedBooking.customerInfo.dietaryRestrictions && (
                                                <div className="border-t border-slate-200 pt-4">
                                                    <h3 className="font-semibold text-slate-700 mb-1">Restricciones</h3>
                                                    <p className="text-sm text-slate-600">{selectedBooking.customerInfo.dietaryRestrictions}</p>
                                                </div>
                                            )}

                                            {selectedBooking.customerInfo.specialRequests && (
                                                <div className="border-t border-slate-200 pt-4">
                                                    <h3 className="font-semibold text-slate-700 mb-1">Solicitudes</h3>
                                                    <p className="text-sm text-slate-600">{selectedBooking.customerInfo.specialRequests}</p>
                                                </div>
                                            )}

                                            <div className="border-t border-slate-200 pt-4">
                                                <h3 className="font-semibold text-slate-700 mb-3">Cambiar Estado</h3>
                                                <div className="space-y-2">
                                                    <button
                                                        onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                                                        className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                                                    >
                                                        Confirmar
                                                    </button>
                                                    <button
                                                        onClick={() => updateBookingStatus(selectedBooking.id, 'completed')}
                                                        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                                                    >
                                                        Completar
                                                    </button>
                                                    <button
                                                        onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                                                        className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        onClick={() => deleteBooking(selectedBooking.id)}
                                                        className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
                                                Creada: {new Date(selectedBooking.createdAt).toLocaleString('es-ES')}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="card p-6 text-center text-slate-500">
                                        <div className="text-6xl mb-4">👈</div>
                                        <p>Selecciona una reserva para ver los detalles</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'tours' ? (
                    <div>
                        <DataMigration />
                        <ToursList />
                    </div>
                ) : (
                    <ReviewsList />
                )}
            </div>
        </div>
    )
}
