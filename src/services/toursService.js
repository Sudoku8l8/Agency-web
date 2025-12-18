import { db } from '../firebase/config'
import { collection, getDocs, getDoc, doc, query, where, limit, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

const COLLECTION_NAME = 'tours'

export const getAllTours = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME))
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error("Error getting tours: ", error)
        return []
    }
}

export const getFeaturedTours = async () => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("isFeatured", "==", true),
            limit(4)
        )
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error("Error getting featured tours: ", error)
        return []
    }
}

export const getTourBySlug = async (slug) => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where("slug", "==", slug))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0]
            return { id: doc.id, ...doc.data() }
        }
        return null
    } catch (error) {
        console.error("Error getting tour by slug: ", error)
        return null
    }
}

// Check if a slug already exists (excluding a specific tour ID)
export const checkSlugExists = async (slug, excludeId = null) => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where("slug", "==", slug))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
            return false
        }

        // If excludeId is provided, check if the found tour is the same one being updated
        if (excludeId) {
            const foundTour = querySnapshot.docs[0]
            return foundTour.id !== excludeId
        }

        return true
    } catch (error) {
        console.error("Error checking slug: ", error)
        return false
    }
}

export const createTour = async (tourData) => {
    try {
        // Check if slug already exists
        const slugExists = await checkSlugExists(tourData.slug)
        if (slugExists) {
            return {
                success: false,
                error: 'Ya existe un tour con este título. Por favor, usa un título diferente.',
                code: 'SLUG_EXISTS'
            }
        }

        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...tourData,
            isActive: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })
        return { success: true, id: docRef.id }
    } catch (error) {
        console.error("Error creating tour: ", error)
        return { success: false, error: error.message }
    }
}

export const updateTour = async (id, tourData) => {
    try {
        // Check if slug already exists in another tour
        if (tourData.slug) {
            const slugExists = await checkSlugExists(tourData.slug, id)
            if (slugExists) {
                return {
                    success: false,
                    error: 'Ya existe otro tour con este título. Por favor, usa un título diferente.',
                    code: 'SLUG_EXISTS'
                }
            }
        }

        const tourRef = doc(db, COLLECTION_NAME, id)
        await updateDoc(tourRef, {
            ...tourData,
            updatedAt: serverTimestamp()
        })
        return { success: true }
    } catch (error) {
        console.error("Error updating tour: ", error)
        return { success: false, error: error.message }
    }
}

export const deleteTour = async (id) => {
    try {
        const tourRef = doc(db, COLLECTION_NAME, id)
        await deleteDoc(tourRef)
        return { success: true }
    } catch (error) {
        console.error("Error deleting tour: ", error)
        return { success: false, error: error.message }
    }
}

export const toggleTourActive = async (id, isActive) => {
    try {
        const tourRef = doc(db, COLLECTION_NAME, id)
        await updateDoc(tourRef, {
            isActive,
            updatedAt: serverTimestamp()
        })
        return { success: true }
    } catch (error) {
        console.error("Error toggling tour active: ", error)
        return { success: false, error: error.message }
    }
}

// Helper function to generate slug from title
export const generateSlug = (title) => {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}
