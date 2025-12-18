import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ItineraryEditor({ itinerary = [], onChange }) {
    const handleAdd = () => {
        onChange([...itinerary, { time: '', activity: '', description: '' }])
    }

    const handleRemove = (index) => {
        onChange(itinerary.filter((_, i) => i !== index))
    }

    const handleChange = (index, field, value) => {
        const updated = itinerary.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        )
        onChange(updated)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-semibold text-slate-700">
                    Itinerario
                </label>
                <button
                    type="button"
                    onClick={handleAdd}
                    className="text-sm text-sacred-purple hover:underline font-medium"
                >
                    + Agregar Item
                </button>
            </div>

            <AnimatePresence>
                {itinerary.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8 border-2 border-dashed border-slate-200 rounded-lg"
                    >
                        <p className="text-slate-500">No hay items en el itinerario</p>
                        <button
                            type="button"
                            onClick={handleAdd}
                            className="mt-2 text-sacred-purple hover:underline"
                        >
                            Agregar primer item
                        </button>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {itinerary.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="border-2 border-slate-200 rounded-lg p-4 bg-slate-50"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-sm font-semibold text-slate-600">
                                        Item {index + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(index)}
                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                    >
                                        Eliminar
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {/* Time */}
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">
                                            Hora / Día
                                        </label>
                                        <input
                                            type="text"
                                            value={item.time}
                                            onChange={(e) => handleChange(index, 'time', e.target.value)}
                                            placeholder="ej: 08:00 AM o Día 1"
                                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none text-sm"
                                        />
                                    </div>

                                    {/* Activity */}
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">
                                            Actividad *
                                        </label>
                                        <input
                                            type="text"
                                            value={item.activity}
                                            onChange={(e) => handleChange(index, 'activity', e.target.value)}
                                            placeholder="ej: Desayuno en el hotel"
                                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none text-sm"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-xs font-medium text-slate-600 mb-1">
                                            Descripción
                                        </label>
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => handleChange(index, 'description', e.target.value)}
                                            placeholder="Descripción detallada de la actividad..."
                                            rows="2"
                                            className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:border-sacred-purple focus:outline-none text-sm"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {itinerary.length > 0 && (
                <button
                    type="button"
                    onClick={handleAdd}
                    className="mt-3 text-sm text-sacred-purple hover:underline font-medium"
                >
                    + Agregar otro item
                </button>
            )}
        </div>
    )
}
