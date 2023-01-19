import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useWorkoutStore } from "../store"
import useGetExercisesByMuscle from "../hooks/useGetExercisesByMuscle"
import MuscleMenu from '../components/MuscleMenu'
import Exercise from "../components/Exercise"
import ModalList from '../components/ModalList'

const MusclePage = () => {
    const { id } = useParams()
    const capitalized = id.charAt(0).toUpperCase() + id.slice(1)
    const {data, isLoading} = useGetExercisesByMuscle(capitalized)
    const { exercises } = useWorkoutStore()
    const [modalShow, setModalShow] = useState(false);
    
    const [searchParams, setSearchParams] = useSearchParams({
        muscle_Id: ""
    })
 
    let muscleId = searchParams.get('muscle_id')
    const handleClick = (value) => {
        setSearchParams({
            muscle_id: value
        })
    }

    return (
        <Container >

            <MuscleMenu/>

            {isLoading && !data && (<p>Loading data...</p>)}

            {data && !muscleId && (
                <Row>
                    {data.map(exercise => (
                        <Col xs={12} key={exercise.id}>
                            <div className="exercise-item d-flex justify-content-between mt-4">
                                <p onClick={() => handleClick(exercise.id)}>{exercise.name}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            )}

            {muscleId && (<Exercise muscle={capitalized} exercise={muscleId} />)}

            {exercises.length >= 1 && (
                <Row>
                    <Col xs={12}>
                        <Button variant="primary" onClick={() => setModalShow(true)}>
                             Go to Workout
                        </Button>
                    </Col>

                    <ModalList show={modalShow} onHide={() => setModalShow(false)}/>
                </Row>
            )}

        </Container>
    )
}

export default MusclePage