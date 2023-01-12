import { Container, Row, Col, Accordion } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import useGetUserWorkouts from '../hooks/useGetUserWorkouts'

const MyWorkoutsPage = () => {
    const { currentUser } = useAuthContext()
    const {data, isLoading} = useGetUserWorkouts(currentUser.uid)

    return (

        <Container>

            {isLoading && !data && (<p>Loading plz wait...</p>)}

            {!isLoading && data && (
                <Row>
                    <h5 className='mt-5'>
                        My Exercises
                    </h5>

                    <Accordion className="mt-2">
                        {data.map((workout, i) => (
                            <Col xs={12} key={workout.id}>
                                <Accordion.Item eventKey={data[i]} className="item my-2">
                                    <Accordion.Header>{workout.title}</Accordion.Header>
                                    {workout.exercises.map(exercise => (
                                    <Accordion.Body key={exercise.name}>{exercise.name}</Accordion.Body>
                                    ))}
                                </Accordion.Item>
                            </Col>
                        ))}
                    </Accordion>
                </Row>
            )}

        </Container>
    )
}

export default MyWorkoutsPage