import { Col, Container, Row } from "react-bootstrap"
import useGetExercise from "../hooks/useGetExercise"

const SingleExercise = ({ id }) => {
    const { data, isLoading } = useGetExercise(id)

    return (
        <Container>
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
                        </div>
                    )}                
                </Col>
            </Row>
        </Container>

    )
}

export default SingleExercise