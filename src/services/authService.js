import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        return { success: true, user: userCredential.user }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const logoutUser = async () => {
    try {
        await signOut(auth)
        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

export const subscribeToAuthChanges = (callback) => {
    return onAuthStateChanged(auth, (user) => {
        callback(user)
    })
}
