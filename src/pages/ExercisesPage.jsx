import { Container, Row, Col, Button } from 'react-bootstrap'
import { useSearchParams } from "react-router-dom"
import useGetExercises from "../hooks/useGetExercises"
import ExerciseByMuscleList from "../components/ExerciseByMuscleList"
import AllExercisesList from "../components/AllExercisesList"

const ExercisesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        muscleGroup: ""
    })

    const muscleGroup = searchParams.get('muscleGroup')
    const {data, isLoading} = useGetExercises()

    const handleClick = (e) => {
        const value = e.target.value
        setSearchParams({
            muscleGroup: value
        })
    }

    return (
        <Container>
            <Row>
                <Col xs={4}>
                    <Button value="legs" onClick={handleClick}>Legs</Button>
                </Col>
                <Col xs={4}>
                    <Button value="chest" onClick={handleClick}>Chest</Button>
                </Col>
                <Col xs={4}>
                    <Button value="arms" onClick={handleClick}>Arms</Button>
                </Col>
            </Row>

            {isLoading && !data && (<p>Loading data...</p>)} 

            {data && !muscleGroup && <AllExercisesList data={data} /> }

            {data && muscleGroup && <ExerciseByMuscleList muscle={muscleGroup} />}

        </Container>

    )
}

export default ExercisesPage