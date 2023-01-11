import useGetExercisesByMuscle from "../hooks/useGetExercisesByMuscle"
import SingleExercise from "./SingleExercise"
import { useSearchParams } from "react-router-dom"
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap'

const ExerciseByMuscleList = ({ muscle }) => {
    const { currentUser } = useAuthContext()
    const [searchParams, setSearchParams] = useSearchParams({
        muscleGroup: muscle,
        id: ""
    })

    let id = searchParams.get('id')
    const {data, isLoading} = useGetExercisesByMuscle(muscle)

    const handleClick = (id) => {
        setSearchParams({
            muscleGroup: muscle,
            id: id
        })
    }
    
    const addToWorkout = async(exerciseObj) => {
        await addDoc(collection(db, `users/${currentUser.uid}/workouts`), {
            title: "",
            time: "",
            exercises: [
                exerciseObj
            ]
       })
    }

    return (
        <>
            {isLoading && !data && (<p>Loading data...</p>)}

            {data && !id && (
                <div>
                    {data.map(exercise => (
                        <div key={exercise.id} className="exercise-item" onClick={() => handleClick(exercise.id)}>
                            <h5>{exercise.name}</h5>
                            <Button onClick={() => addToWorkout(exercise)}>add to subcollection</Button>
                        </div>
                    ))}
                </div>
            )}

            {data && id && (<SingleExercise muscle={muscle} id={id} />)}
        </>
    )
}

export default ExerciseByMuscleList