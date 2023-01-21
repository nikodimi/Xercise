import { db } from '../firebase'
import { collection, orderBy, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetUserWorkouts = (id, value) => {
    // Get reference of collection 'workouts'

    let queryRef;
    if (value == "history") {
         queryRef = query(
            collection(db, `users/${id}/workouts`),
            orderBy('completed', 'desc')
        )
    }
    if (value == "workout") {
         queryRef = query(
            collection(db, `users/${id}/workouts`),
            orderBy('created', 'desc')
        )
    }

	const workoutsQuery = useFirestoreQueryData([`${value}-workouts`], queryRef, {
		idField: 'id',
		subscribe: 'true' 
	})

    return workoutsQuery
}

export default useGetUserWorkouts