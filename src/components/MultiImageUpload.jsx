import { useState } from 'react'
import { storage } from '../firebase/config'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function MultiImageUpload({ images = [], onChange }) {
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const handleUpload = async (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return

        setUploading(true)
        const uploadedUrls = []

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const storageRef = ref(storage, `tours/gallery/${Date.now()}_${file.name}`)
                const uploadTask = uploadBytesResumable(storageRef, file)

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = ((i + snapshot.bytesTransferred / snapshot.totalBytes) / files.length) * 100
                            setUploadProgress(Math.round(progress))
                        },
                        (error) => {
                            console.error('Upload error:', error)
                            reject(error)
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                            uploadedUrls.push(downloadURL)
                            resolve()
                        }
                    )
                })
            }

            onChange([...images, ...uploadedUrls])
            toast.success(`${files.length} imagen(es) subida(s) correctamente`)
        } catch (error) {
            toast.error('Error al subir imágenes')
        } finally {
            setUploading(false)
            setUploadProgress(0)
        }
    }

    const handleRemove = (index) => {
        const newImages = images.filter((_, i) => i !== index)
        onChange(newImages)
        toast.success('Imagen eliminada')
    }

    const handleReorder = (fromIndex, toIndex) => {
        const newImages = [...images]
        const [removed] = newImages.splice(fromIndex, 1)
        newImages.splice(toIndex, 0, removed)
        onChange(newImages)
    }

    return (
        <div className="space-y-4">
            {/* Upload Button */}
            <div>
                <label
                    htmlFor="gallery-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                    <div className="text-center">
                        <svg className="w-10 h-10 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="text-sm text-slate-600">
                            {uploading ? `Subiendo... ${uploadProgress}%` : 'Click para subir imágenes'}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG o WebP (múltiples permitidas)</p>
                    </div>
                    <input
                        id="gallery-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Upload Progress */}
            {uploading && (
                <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                        className="bg-sacred-purple h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                    />
                </div>
            )}

            {/* Image Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                        {images.map((url, index) => (
                            <motion.div
                                key={url}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group"
                            >
                                <img
                                    src={url}
                                    alt={`Imagen ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg border-2 border-slate-200"
                                />

                                {/* Overlay Controls */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                    {/* Move Left */}
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => handleReorder(index, index - 1)}
                                            className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
                                            title="Mover a la izquierda"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                    )}

                                    {/* Remove */}
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(index)}
                                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        title="Eliminar"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    {/* Move Right */}
                                    {index < images.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleReorder(index, index + 1)}
                                            className="p-2 bg-white rounded-full hover:bg-slate-100 transition-colors"
                                            title="Mover a la derecha"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* Image Number Badge */}
                                <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                                    {index + 1}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {images.length === 0 && (
                <p className="text-center text-slate-500 text-sm py-4">
                    No hay imágenes en la galería. Sube algunas para comenzar.
                </p>
            )}
        </div>
    )
}
