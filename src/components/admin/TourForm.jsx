import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createTour, updateTour, generateSlug } from '../../services/toursService'
import ItineraryEditor from './ItineraryEditor'
import ImageUpload from '../ImageUpload'
import MultiImageUpload from '../MultiImageUpload'
import toast from 'react-hot-toast'

export default function TourForm({ tour, onClose }) {
    const isEditing = !!tour

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        duration: '',
        difficulty: 'Fácil',
        groupSize: '',
        image: '',
        gallery: [],
        shortDescription: '',
        description: '',
        highlights: [''],
        included: [''],
        notIncluded: [''],
        recommendations: [''],
        itinerary: [],
        isFeatured: false,
        badge: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (tour) {
            setFormData({
                title: tour.title || '',
                category: tour.category || '',
                price: tour.price || '',
                duration: tour.duration || '',
                difficulty: tour.difficulty || 'Fácil',
                groupSize: tour.groupSize || '',
                image: tour.image || '',
                gallery: tour.gallery || [],
                shortDescription: tour.shortDescription || '',
                description: tour.description || '',
                highlights: tour.highlights || [''],
                included: tour.included || [''],
                notIncluded: tour.notIncluded || [''],
                recommendations: tour.recommendations || [''],
                itinerary: tour.itinerary || [],
                isFeatured: tour.isFeatured || false,
                badge: tour.badge || ''
            })
        }
    }, [tour])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }))
    }

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }))
    }

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Generate slug from title
        const slug = generateSlug(formData.title)

        // Clean up arrays (remove empty strings)
        const cleanData = {
            ...formData,
            slug,
            price: Number(formData.price),
            highlights: formData.highlights.filter(h => h.trim()),
            included: formData.included.filter(i => i.trim()),
            notIncluded: formData.notIncluded.filter(n => n.trim()),
            recommendations: formData.recommendations.filter(r => r.trim())
        }

        const result = isEditing
            ? await updateTour(tour.id, cleanData)
            : await createTour(cleanData)

        if (result.success) {
            toast.success(isEditing ? 'Tour actualizado correctamente' : 'Tour creado correctamente')
            onClose()
        } else {
            toast.error('Error: ' + result.error)
        }

        setIsSubmitting(false)
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="card max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
                >
                    <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
                        <h2 className="text-2xl font-display font-bold text-slate-800">
                            {isEditing ? 'Editar Tour' : 'Crear Nuevo Tour'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Featured & Badge */}
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    id="isFeatured"
                                    checked={formData.isFeatured}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-sacred-purple rounded focus:ring-sacred-purple"
                                />
                                <label htmlFor="isFeatured" className="font-semibold text-slate-700 cursor-pointer">
                                    Destacado en Home
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Etiqueta Promocional
                                </label>
                                <select
                                    name="badge"
                                    value={formData.badge}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                >
                                    <option value="">Ninguna</option>
                                    <option value="MÁS POPULAR">⭐ MÁS POPULAR</option>
                                    <option value="NUEVO">✨ NUEVO</option>
                                    <option value="OFERTA">🔥 OFERTA</option>
                                </select>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Categoría *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="Arqueología">Arqueología</option>
                                    <option value="Aventura">Aventura</option>
                                    <option value="Naturaleza">Naturaleza</option>
                                    <option value="Cultural">Cultural</option>
                                    <option value="Místico">Místico</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Precio (USD) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Duración *
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="ej: Full Day, 3 días"
                                    required
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Dificultad *
                                </label>
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                >
                                    <option value="Fácil">Fácil</option>
                                    <option value="Moderado">Moderado</option>
                                    <option value="Difícil">Difícil</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Tamaño de Grupo *
                                </label>
                                <input
                                    type="text"
                                    name="groupSize"
                                    value={formData.groupSize}
                                    onChange={handleChange}
                                    placeholder="ej: 2-15 personas"
                                    required
                                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Imagen Principal
                            </label>
                            <ImageUpload
                                initialImage={formData.image}
                                onUploadSuccess={(url) => setFormData(prev => ({ ...prev, image: url }))}
                            />
                        </div>

                        {/* Gallery Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Galería de Imágenes
                            </label>
                            <MultiImageUpload
                                images={formData.gallery}
                                onChange={(newGallery) => setFormData(prev => ({ ...prev, gallery: newGallery }))}
                            />
                        </div>

                        {/* Descriptions */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Descripción Corta *
                            </label>
                            <textarea
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                required
                                rows="2"
                                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Descripción Completa *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                            />
                        </div>

                        {/* Dynamic Arrays */}
                        <ArrayField
                            label="Highlights"
                            items={formData.highlights}
                            onChange={(index, value) => handleArrayChange('highlights', index, value)}
                            onAdd={() => addArrayItem('highlights')}
                            onRemove={(index) => removeArrayItem('highlights', index)}
                        />

                        <ArrayField
                            label="Incluido"
                            items={formData.included}
                            onChange={(index, value) => handleArrayChange('included', index, value)}
                            onAdd={() => addArrayItem('included')}
                            onRemove={(index) => removeArrayItem('included', index)}
                        />

                        <ArrayField
                            label="No Incluido"
                            items={formData.notIncluded}
                            onChange={(index, value) => handleArrayChange('notIncluded', index, value)}
                            onAdd={() => addArrayItem('notIncluded')}
                            onRemove={(index) => removeArrayItem('notIncluded', index)}
                        />

                        <ArrayField
                            label="Recomendaciones"
                            items={formData.recommendations}
                            onChange={(index, value) => handleArrayChange('recommendations', index, value)}
                            onAdd={() => addArrayItem('recommendations')}
                            onRemove={(index) => removeArrayItem('recommendations', index)}
                        />

                        {/* Itinerary Editor */}
                        <ItineraryEditor
                            itinerary={formData.itinerary}
                            onChange={(newItinerary) => setFormData(prev => ({ ...prev, itinerary: newItinerary }))}
                        />

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary disabled:opacity-50"
                            >
                                {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Tour')}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

// Helper component for dynamic arrays
function ArrayField({ label, items, onChange, onAdd, onRemove }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                {label}
            </label>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => onChange(index, e.target.value)}
                            className="flex-1 px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none"
                        />
                        {items.length > 1 && (
                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                ×
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    onClick={onAdd}
                    className="text-sm text-sacred-purple hover:underline"
                >
                    + Agregar {label}
                </button>
            </div>
        </div>
    )
}
