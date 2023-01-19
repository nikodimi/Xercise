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
        <Container className='position-relative'>

            <MuscleMenu/>

            {isLoading && !data && (<p>Loading data...</p>)}

            {data && !muscleId && (
                <Row>
                    <Col xs={12}>
                        {data.map(exercise => (
                            <div key={exercise.id} className="exercise-item d-flex justify-content-between mt-4">
                                <p onClick={() => handleClick(exercise.id)}>{exercise.name}</p>
                            </div>
                        ))}
                    </Col>
                </Row>
            )}

            {muscleId && (<Exercise muscle={capitalized} exercise={muscleId} />)}

            {exercises.length >= 1 && (
                <Row className="w-100">
                    <Col xs={12}>
                        <Button className="action-btn modal-btn text-center" onClick={() => setModalShow(true)}>
                            Go to Workout({exercises.length})
                        </Button>
                    </Col>

                    <ModalList show={modalShow} onHide={() => setModalShow(false)}/>
                </Row>
            )}

        </Container>
    )
}

export default MusclePage