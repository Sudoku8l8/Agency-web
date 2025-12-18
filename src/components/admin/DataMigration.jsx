import { useState } from 'react'
import { tours } from '../../data/tours'
import { createTour } from '../../services/toursService'

export default function DataMigration() {
    const [migrating, setMigrating] = useState(false)
    const [logs, setLogs] = useState([])

    const addLog = (msg) => setLogs(prev => [...prev, msg])

    const handleMigration = async () => {
        if (!confirm('¿Estás seguro de migrar los tours? Esto creará duplicados si ya existen.')) return

        setMigrating(true)
        setLogs([])
        addLog('Iniciando migración...')

        let successCount = 0
        let errorCount = 0

        for (const tour of tours) {
            try {
                // Remove id to let Firestore generate it
                const { id, ...tourData } = tour

                // Add active status
                const dataToSave = {
                    ...tourData,
                    isActive: true,
                    migratedAt: new Date().toISOString()
                }

                const result = await createTour(dataToSave)

                if (result.success) {
                    addLog(`✅ Migrado: ${tour.title}`)
                    successCount++
                } else {
                    addLog(`❌ Error: ${tour.title} - ${result.error}`)
                    errorCount++
                }
            } catch (error) {
                addLog(`❌ Error crítico: ${tour.title} - ${error.message}`)
                errorCount++
            }
        }

        addLog(`🏁 Migración completada. Éxitos: ${successCount}, Errores: ${errorCount}`)
        setMigrating(false)
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-bold mb-4">Migración de Datos</h3>

            <button
                onClick={handleMigration}
                disabled={migrating}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {migrating ? 'Migrando...' : 'Migrar Tours a Firestore'}
            </button>

            {logs.length > 0 && (
                <div className="mt-4 p-4 bg-slate-100 rounded-lg max-h-60 overflow-y-auto font-mono text-sm">
                    {logs.map((log, i) => (
                        <div key={i} className="mb-1">{log}</div>
                    ))}
                </div>
            )}
        </div>
    )
}
