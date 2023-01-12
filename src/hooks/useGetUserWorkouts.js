import { db } from '../firebase'
import { collection, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetUserWorkouts = (id) => {
    // Get reference of collection 'workouts'
    const queryRef = query(
		collection(db, `users/${id}/workouts`)
	)

	const workoutsQuery = useFirestoreQueryData(['user-workouts'], queryRef, {
		idField: 'id',
		subscribe: 'true' 
	})

    return workoutsQuery
}

export default useGetUserWorkouts