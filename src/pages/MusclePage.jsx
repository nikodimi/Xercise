import { Container, Row, Col, Button } from 'react-bootstrap'
import { useParams, useSearchParams } from 'react-router-dom'
import useGetExercisesByMuscle from "../hooks/useGetExercisesByMuscle"
import Exercise from "../components/Exercise"
import { useWorkoutStore } from "../store"
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const MusclePage = () => {
    const { currentUser } = useAuthContext()
    const { id } = useParams()
    const capitalized = id.charAt(0).toUpperCase() + id.slice(1)
    const {data, isLoading} = useGetExercisesByMuscle(capitalized)
    const { resetWorkout, exercises } = useWorkoutStore()
    
    const [searchParams, setSearchParams] = useSearchParams({
        muscle_Id: ""
    })
 
    let muscleId = searchParams.get('muscle_id')
    const handleClick = (value) => {
        setSearchParams({
            muscle_id: value
        })
    }

    const addToWorkouts = async(workout) => {
        await addDoc(collection(db, `users/${currentUser.uid}/workouts`), {
            title: "",
            time: "",
            exercises: workout
       })
       resetWorkout()
    }
    
    return (
        <Container>

            {isLoading && !data && (<p>Loading data...</p>)}

            {data && !muscleId && (
                <Row>
                    {data.map(exercise => (
                        <Col xs={12} key={exercise.id}>
                            <div className="exercise-item d-flex justify-content-between my-3">
                                <h5 onClick={() => handleClick(exercise.id)}>{exercise.name}</h5>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}

            {muscleId && (<Exercise muscle={capitalized} exercise={muscleId} />)}

            {exercises.length >= 1 && (
                <Row>
                    <Col>
                        <div className='d-flex justify-content-between my-3'>
                            <Button className="save-btn w-100" onClick={() => addToWorkouts(exercises)}>Add to Workout({exercises.length})</Button>
                            <Button className="reset-btn w-100 ms-3" variant="danger" onClick={() => resetWorkout()}>Reset Workout</Button>
                        </div>
                    </Col>
                </Row>
            )}

        </Container>
    )
}

export default MusclePage