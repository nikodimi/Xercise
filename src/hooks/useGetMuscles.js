import { db } from '../firebase'
import { collection, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetMuscles = () => {
    // Get reference of collection 'exercises'
    const queryRef = query(
		collection(db, 'muscles')
	)

	const exercisesQuery = useFirestoreQueryData(['all-muscles'], queryRef, {
		idField: 'id',
		subscribe: 'true' 
	})

    return exercisesQuery
}

export default useGetMuscles