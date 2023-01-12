import { Col, Row, Button } from "react-bootstrap"
import { useWorkoutStore } from "../store"
import useGetExercise from "../hooks/useGetExercise"

const SingleExercise = ({ muscle, id }) => {
    const { addToWorkout } = useWorkoutStore()
    const { data, isLoading } = useGetExercise(muscle, id)

    const addExerciseToWorkout = (exercise) => {
        addToWorkout(exercise)
    }

    return (
        <Row>
            <Col>
                {isLoading && !data && (<p>Loading...</p>)}

                {!isLoading && data &&(
                    <div>
                        <p>{data.name}</p>
                        <p>{data.category}</p>
                        <p>{data.description}</p>
                        <p>{data.link}</p>
                        <p>{data.sets}</p>
                        <p>{data.reps}</p>
                        <p>{data.kg}</p>
                        <Button className="me-2" onClick={() => addExerciseToWorkout(data)}>add</Button>
                    </div>
                )}                
            </Col>
        </Row>
    )
}

export default SingleExercise