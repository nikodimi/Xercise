import { Container, Row, Col, Button } from 'react-bootstrap'
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useWorkoutStore } from "../store"
import useGetMuscles from '../hooks/useGetMuscles'
import MuscleMenu from '../components/MuscleMenu'

const MusclesPage = () => {
    const { resetWorkout, exercises } = useWorkoutStore()
    const {data, isLoading} = useGetMuscles()

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
                <MuscleMenu data={data}/>
            )}
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

export default MusclesPage