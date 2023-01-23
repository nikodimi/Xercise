import { Col, Row } from "react-bootstrap"
import { useWorkoutStore } from "../store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import useGetExercise from "../hooks/useGetExercise"
import { Link } from 'react-router-dom'

const Exercise = ({ muscle, exercise }) => {
    const { addToWorkout, removeFromWorkout, exercises } = useWorkoutStore()
    const { data, isLoading } = useGetExercise(muscle, exercise)

    const addExerciseToWorkout = (exercise) => {
        addToWorkout(exercise)
    }

    const removeExerciseFromWorkout = (exercise) => {
        removeFromWorkout(exercise)
    }

    const added = exercises.some(e => e.name === data.name)

    return (
        <Row>
            <Col>
                {isLoading && !data && (<p>Loading...</p>)}

                {!isLoading && data &&(
                    <div className="pt-3">
                        <div className="d-flex justify-content-between my-3">
                            <h5 className="fw-bold text-white text-uppercase">{data.id}</h5>
                            {added? (
                                <FontAwesomeIcon 
                                    size="lg" 
                                    icon={faMinus} 
                                    onClick={() => removeExerciseFromWorkout(data)}
                                />
                            ) : (
                                <FontAwesomeIcon 
                                    size="lg" 
                                    icon={faPlus} 
                                    onClick={() => addExerciseToWorkout(data)}
                                />
                            )
                        }
                        </div>
                        <div>
                            <p>{data.instructions}</p>
                        </div>

                        <div className="mt-3">
                            <h5 className="text-weight fw-bold text-white">Instructions</h5>
                            
                            <a href={data.link}>
                                <FontAwesomeIcon 
                                    size="2x" 
                                    icon={faYoutube} 
                                    className="mt-3"
                                />
                            </a>
                            
                        </div>
                    </div>
                )}                
            </Col>
        </Row>
    )
}

export default Exercise