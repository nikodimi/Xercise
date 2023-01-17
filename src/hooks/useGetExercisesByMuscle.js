import { db } from '../firebase'
import { collection, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetExercisesByMuscle = (muscle) => {
    // Get reference of collection 'exercises'
    const queryRef = query(
		collection(db, `muscles/${muscle}/exercises`)
	)

	const exercisesByMuscleQuery = useFirestoreQueryData([`${muscle}-exercises`], queryRef, {
		idField: 'id',
		subscribe: 'true' 
	})

    return exercisesByMuscleQuery
}

export default useGetExercisesByMuscle