import { db } from '../firebase'
import { collectionGroup, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetAllExercises = () => {
    // Get reference of collection 'exercises'
    const queryRef = query(
		collectionGroup(db, 'exercises')
	)

	const exercisesQuery = useFirestoreQueryData(['all-exercises'], queryRef, {
		idField: 'id',
		subscribe: 'true' 
	})

    return exercisesQuery
}

export default useGetAllExercises