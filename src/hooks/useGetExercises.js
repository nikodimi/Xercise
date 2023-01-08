import { db } from '../firebase'
import { collection, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetExercises = () => {
    // Get reference of collection 'exercises'
    const queryRef = query(
		collection(db, 'exercises')
	)

	const exercisesQuery = useFirestoreQueryData(['all-exercises'], queryRef, {
		idField: 'id',
		subscribe: 'true' 
	})

    return exercisesQuery
}

export default useGetExercises