import { db } from '../firebase/config'
import { collection, getDocs, getDoc, doc, query, where, orderBy, addDoc, updateDoc, deleteDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'

const COLLECTION_NAME = 'reviews'

export const getAllReviews = async () => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
        console.error("Error getting reviews: ", error)
        return []
    }
}

export const getReviewsByTour = async (tourId) => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where("tourId", "==", tourId),
            where("status", "==", "approved")
        )
        const querySnapshot = await getDocs(q)
        const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        // Sort by createdAt in JavaScript to avoid composite index requirement
        return reviews.sort((a, b) => {
            const dateA = a.createdAt?.toDate?.() || new Date(0)
            const dateB = b.createdAt?.toDate?.() || new Date(0)
            return dateB - dateA // Descending order (newest first)
        })
    } catch (error) {
        console.error("Error getting tour reviews: ", error)
        return []
    }
}

export const createReview = async (reviewData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...reviewData,
            status: 'pending',
            createdAt: serverTimestamp()
        })
        return { success: true, id: docRef.id }
    } catch (error) {
        console.error("Error creating review: ", error)
        return { success: false, error: error.message }
    }
}

export const updateReviewStatus = async (id, status) => {
    try {
        const reviewRef = doc(db, COLLECTION_NAME, id)
        await updateDoc(reviewRef, {
            status,
            updatedAt: serverTimestamp()
        })
        return { success: true }
    } catch (error) {
        console.error("Error updating review: ", error)
        return { success: false, error: error.message }
    }
}

export const deleteReview = async (id) => {
    try {
        const reviewRef = doc(db, COLLECTION_NAME, id)
        await deleteDoc(reviewRef)
        return { success: true }
    } catch (error) {
        console.error("Error deleting review: ", error)
        return { success: false, error: error.message }
    }
}

// Subscribe to real-time reviews updates
export const subscribeToReviews = (callback) => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))

    return onSnapshot(q, (querySnapshot) => {
        const reviews = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        callback(reviews)
    }, (error) => {
        console.error("Error in reviews subscription: ", error)
        callback([])
    })
}
