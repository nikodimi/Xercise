import { Container, Row, Col } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import useGetUserWorkouts from '../hooks/useGetUserWorkouts'
import { Link } from 'react-router-dom'

const WorkoutsPage = () => {
    const { currentUser } = useAuthContext()
    const {data, isLoading} = useGetUserWorkouts(currentUser.uid)

    return (

        <Container>

            {isLoading && !data && (<p>Loading plz wait...</p>)}

            {!isLoading && data && (
                <Row>
                    <Col xs={12}>
                        <h4 className='my-3'>
                            My Exercises
                        </h4>
                        {data.map(workout => (
                            <div key={workout.id}>
                                <Link to={`/workouts/${workout.id}`}><h5>{workout.title}</h5></Link>
                                <p>{workout.exercises.length} exercises</p>
                            </div>
                        ))}
                    </Col>
                </Row>
            )}                

        </Container>
    )
}

export default WorkoutsPage