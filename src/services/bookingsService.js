import { db } from '../firebase/config'
import { collection, addDoc, updateDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'

const COLLECTION_NAME = 'bookings'

export const createBooking = async (bookingData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...bookingData,
            createdAt: new Date().toISOString()
        })
        return { success: true, id: docRef.id }
    } catch (error) {
        console.error("Error creating booking: ", error)
        return { success: false, error: error.message }
    }
}

export const subscribeToBookings = (callback) => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'))
    return onSnapshot(q, (snapshot) => {
        const bookings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        callback(bookings)
    })
}

export const updateBookingStatus = async (id, status) => {
    try {
        const bookingRef = doc(db, COLLECTION_NAME, id)
        await updateDoc(bookingRef, { status })
        return { success: true }
    } catch (error) {
        console.error("Error updating booking status: ", error)
        return { success: false, error: error.message }
    }
}
