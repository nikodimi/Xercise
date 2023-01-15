import { Container, Row, Col, Button } from 'react-bootstrap'
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { useSearchParams } from "react-router-dom"
import { useWorkoutStore } from "../store"
import useGetMuscles from '../hooks/useGetMuscles'
import ExerciseByMuscleList from "../components/ExerciseByMuscleList"
import AllExercisesList from "../components/AllExercisesList"

const ExercisesPage = () => {
    const { currentUser } = useAuthContext()
    const { resetWorkout, exercises } = useWorkoutStore()
    const [searchParams, setSearchParams] = useSearchParams({
        muscleGroup: ""
    })

    const muscleGroup = searchParams.get('muscleGroup')
    const {data, isLoading} = useGetMuscles()

    const handleClick = (value) => {
        setSearchParams({
            muscleGroup: value
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

            {!isLoading && data && (
                <Row className="scrollbar">
                    {data.map(exercise => (
                        <Col xs={4} className="scrollbar-item" key={exercise.id} onClick={() => handleClick(exercise.name)}>
                            <h5 value={exercise.name} >{exercise.name}</h5>
                        </Col>
                    ))}
                </Row>
            )}

            {!muscleGroup && <AllExercisesList /> }

            {muscleGroup && <ExerciseByMuscleList muscle={muscleGroup} />}

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

export default ExercisesPage