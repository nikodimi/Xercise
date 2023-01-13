import { Container, Row, Col, Accordion } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import useGetUserWorkouts from '../hooks/useGetUserWorkouts'

const WorkoutsPage = () => {
    const { currentUser } = useAuthContext()
    const {data, isLoading} = useGetUserWorkouts(currentUser.uid)

    return (

        <Container>

            {isLoading && !data && (<p>Loading plz wait...</p>)}

            {!isLoading && data && (
                <Row>
                    <h4 className='my-3'>
                        My Exercises
                    </h4>
                        {data.map(workout => (
                            <Col xs={12} key={workout.id}>
                                <div>
                                    <h5>{workout.title}</h5>
                                    <p>{workout.exercises.length} exercises</p>
                                </div>
                            </Col>
                        ))}
                </Row>
            )}

        </Container>
    )
}

export default WorkoutsPage