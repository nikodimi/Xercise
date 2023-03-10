import { Container, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useWorkoutStore } from "../zustand/store"
import useGetExercisesByMuscle from "../hooks/useGetExercisesByMuscle"
import MuscleMenu from '../components/MuscleMenu'
import Exercise from "../components/Exercise"
import ModalList from '../components/ModalList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const MusclePage = () => {
    const { id } = useParams()
    const capitalized = id.charAt(0).toUpperCase() + id.slice(1)
    const {data, isLoading} = useGetExercisesByMuscle(capitalized)
    const { exercises, addToWorkout, removeFromWorkout } = useWorkoutStore()
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

    const addExerciseToWorkout = (d) => {
        addToWorkout(d)
    }

    const removeExerciseFromWorkout = (d) => {
        removeFromWorkout(d)
    }

    return (
        <>
            <Container className={exercises.length ? 'small-container' : ""}>

                <MuscleMenu/>

                {isLoading && !data && (<p>Loading data...</p>)}

                {data && !muscleId && (
                    <Row>
                        <Col xs={12}>
                            {data.map(exercise => (
                                <div key={exercise.id} className="exercise-item mt-4 d-flex justify-content-between">
                                    <div>
                                        <p className="text-uppercase fw-bold text-white" onClick={() => handleClick(exercise.id)}>{exercise.name}</p>
                                        <p className=''>{capitalized}</p>
                                    </div>
                                    {
                                        exercises.some(e => e.name === exercise.name) === true ?  (
                                            <FontAwesomeIcon 
                                                size="lg" 
                                                icon={faMinus} 
                                                onClick={() => removeExerciseFromWorkout(exercise)}
                                            />
                                        ) : (
                                            
                                            <FontAwesomeIcon 
                                                size="lg" 
                                                icon={faPlus} 
                                                onClick={() => addExerciseToWorkout(exercise)}
                                        />
                                        )
                                    }
                                </div>
                            ))}
                        </Col>
                    </Row>
                )}

                {muscleId && (<Exercise muscle={capitalized} exercise={muscleId} />)}
                
            </Container>

            {exercises.length >= 1 && (
                <Container className='button-container'>
                    <Row className="w-100 ">
                        <Col xs={12} className="p-0">
                            <Button className="action-btn text-center w-100 ms-2" onClick={() => setModalShow(true)}>
                                Go to Workout({exercises.length})
                            </Button>
                        </Col>

                        <ModalList show={modalShow} onHide={() => setModalShow(false)}/>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default MusclePage