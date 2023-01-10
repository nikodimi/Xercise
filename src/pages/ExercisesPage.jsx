import { Container, Row, Col, Button} from 'react-bootstrap'
import { useSearchParams } from "react-router-dom"
import ExerciseByMuscleList from "../components/ExerciseByMuscleList"
import AllExercisesList from "../components/AllExercisesList"
import useGetMuscles from '../hooks/useGetMuscles'

const ExercisesPage = () => {
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

        </Container>

    )
}

export default ExercisesPage