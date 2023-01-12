import { Container, Row, Col } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import useGetUserWorkouts from '../hooks/useGetUserWorkouts'

const MyWorkoutsPage = () => {
    const { currentUser } = useAuthContext()
    console.log('currentUser.id', currentUser.uid)
    const {data, isLoading} = useGetUserWorkouts(currentUser.uid)
    console.log('data', data)

    return (

        <Container>

            {isLoading && !data && (<p>Loading plz wait...</p>)}

            {!isLoading && data && (
                <Row>
                    {data.map(workout => (
                        <Col xs={12} key={workout.id}>
                            <div>
                                <h5>{workout.title}</h5>
                                {/* {workout.exercises.map(exercise => (
                                    <h5 key={exercise.name}>{exercise.name}</h5>
                                ))} */}
                            </div>
                        </Col>
                    ))}
                </Row>
            )}

        </Container>
    )
}

export default MyWorkoutsPage