import { Col, Row } from "react-bootstrap"
import { useWorkoutStore } from "../store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import useGetExercise from "../hooks/useGetExercise"

const SingleExercise = ({ muscle, id }) => {
    const { addToWorkout, removeFromWorkout, exercises } = useWorkoutStore()
    const { data, isLoading } = useGetExercise(muscle, id)

    const addExerciseToWorkout = (exercise) => {
        addToWorkout(exercise)
    }

    const removeExerciseFromWorkout = (exercise) => {
        removeFromWorkout(exercise)
    }

    const exists = exercises.some(e => e.name === data.name)

    return (
        <Row>
            <Col>
                {isLoading && !data && (<p>Loading...</p>)}

                {!isLoading && data &&(
                    <div className="mt-3">
                        <div className="d-flex justify-content-between">
                            <h5>{data.name}</h5>
                            {exists? (
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
                    </div>
                )}                
            </Col>
        </Row>
    )
}

export default SingleExercise