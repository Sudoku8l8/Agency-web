import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllTours, deleteTour, toggleTourActive } from '../../services/toursService'
import TourForm from './TourForm'

export default function ToursList() {
    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingTour, setEditingTour] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    // Filter states
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterCategory, setFilterCategory] = useState('all')
    const [filterPrice, setFilterPrice] = useState({ min: '', max: '' })

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 10

    useEffect(() => {
        loadTours()
    }, [])

    const loadTours = async () => {
        setLoading(true)
        const toursData = await getAllTours()
        setTours(toursData)
        setLoading(false)
    }

    const handleDelete = async (id, title) => {
        if (confirm(`¿Estás seguro de eliminar "${title}"?`)) {
            const result = await deleteTour(id)
            if (result.success) {
                setTours(tours.filter(t => t.id !== id))
            } else {
                alert('Error al eliminar: ' + result.error)
            }
        }
    }

    const handleToggleActive = async (id, currentStatus) => {
        const result = await toggleTourActive(id, !currentStatus)
        if (result.success) {
            setTours(tours.map(t =>
                t.id === id ? { ...t, isActive: !currentStatus } : t
            ))
        } else {
            alert('Error al actualizar: ' + result.error)
        }
    }

    const handleEdit = (tour) => {
        setEditingTour(tour)
        setShowForm(true)
    }

    const handleFormClose = () => {
        setShowForm(false)
        setEditingTour(null)
        loadTours()
    }

    const filteredTours = tours.filter(tour => {
        // Search filter
        const matchesSearch = tour.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tour.category?.toLowerCase().includes(searchTerm.toLowerCase())

        // Status filter
        const matchesStatus = filterStatus === 'all' ||
            (filterStatus === 'active' && tour.isActive) ||
            (filterStatus === 'inactive' && !tour.isActive)

        // Category filter
        const matchesCategory = filterCategory === 'all' || tour.category === filterCategory

        // Price filter
        const matchesPrice =
            (!filterPrice.min || tour.price >= parseInt(filterPrice.min)) &&
            (!filterPrice.max || tour.price <= parseInt(filterPrice.max))

        return matchesSearch && matchesStatus && matchesCategory && matchesPrice
    })

    const clearFilters = () => {
        setSearchTerm('')
        setFilterStatus('all')
        setFilterCategory('all')
        setFilterPrice({ min: '', max: '' })
    }

    const categories = ['Arqueología', 'Aventura', 'Naturaleza', 'Cultural', 'Místico']

    // Pagination calculations
    const totalPages = Math.ceil(filteredTours.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedTours = filteredTours.slice(startIndex, endIndex)

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, filterStatus, filterCategory, filterPrice])

    if (loading) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sacred-purple mx-auto mb-4"></div>
                <p className="text-slate-600">Cargando tours...</p>
            </div>
        )
    }

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-display font-bold text-slate-800">Gestión de Tours</h2>
                    <p className="text-slate-600 text-sm">{tours.length} tours totales</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary"
                >
                    + Crear Tour
                </button>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Buscar por título o categoría..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                />

                {/* Filters */}
                <div className="card p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-slate-700">🔍 Filtros</h3>
                        <button
                            onClick={clearFilters}
                            className="text-sm text-sacred-purple hover:underline"
                        >
                            Limpiar filtros
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Estado</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none text-sm"
                            >
                                <option value="all">Todos</option>
                                <option value="active">Activos</option>
                                <option value="inactive">Inactivos</option>
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Categoría</label>
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none text-sm"
                            >
                                <option value="all">Todas</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Price Range Filter */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Precio Mínimo</label>
                            <input
                                type="number"
                                placeholder="$0"
                                value={filterPrice.min}
                                onChange={(e) => setFilterPrice({ ...filterPrice, min: e.target.value })}
                                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Precio Máximo</label>
                            <input
                                type="number"
                                placeholder="$999"
                                value={filterPrice.max}
                                onChange={(e) => setFilterPrice({ ...filterPrice, max: e.target.value })}
                                className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none text-sm"
                            />
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-3 text-sm text-slate-600">
                        Mostrando {filteredTours.length} de {tours.length} tours
                    </div>
                </div>
            </div>

            {/* Tours Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Tour</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Categoría</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Precio</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Duración</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Estado</th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {paginatedTours.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                        {searchTerm ? 'No se encontraron tours' : 'No hay tours creados'}
                                    </td>
                                </tr>
                            ) : (
                                paginatedTours.map((tour) => (
                                    <motion.tr
                                        key={tour.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {tour.image && (
                                                    <img
                                                        src={tour.image}
                                                        alt={tour.title}
                                                        className="w-12 h-12 rounded object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <div className="font-semibold text-slate-800">{tour.title}</div>
                                                    <div className="text-xs text-slate-500">{tour.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{tour.category}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">${tour.price}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{tour.duration}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleActive(tour.id, tour.isActive)}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${tour.isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                    }`}
                                            >
                                                {tour.isActive ? 'Activo' : 'Inactivo'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(tour)}
                                                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(tour.id, tour.title)}
                                                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {filteredTours.length > ITEMS_PER_PAGE && (
                    <div className="px-6 py-4 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-600">
                                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredTours.length)} de {filteredTours.length} tours
                            </div>

                            <div className="flex gap-2">
                                {/* First Page */}
                                <button
                                    onClick={() => setCurrentPage(1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    ««
                                </button>

                                {/* Previous */}
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    «
                                </button>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(page => {
                                        // Show first page, last page, current page, and adjacent pages
                                        return page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1)
                                    })
                                    .map((page, index, array) => (
                                        <div key={page} className="flex items-center gap-2">
                                            {index > 0 && array[index - 1] !== page - 1 && (
                                                <span className="text-slate-400">...</span>
                                            )}
                                            <button
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 border rounded text-sm ${currentPage === page
                                                    ? 'bg-sacred-purple text-white border-sacred-purple'
                                                    : 'border-slate-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        </div>
                                    ))
                                }

                                {/* Next */}
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    »
                                </button>

                                {/* Last Page */}
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    »»
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <TourForm
                    tour={editingTour}
                    onClose={handleFormClose}
                />
            )}
        </div>
    )
}
