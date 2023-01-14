import { Container, Row, Col, Button } from 'react-bootstrap'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import useGetWorkout from '../hooks/useGetWorkout'

const WorkoutPage = () => {
    const { id } = useParams()
    const { currentUser } = useAuthContext()
    const { data, isLoading } = useGetWorkout(currentUser.uid, id)
    const navigate = useNavigate()

    return (
        <Container className='mt-3'>

            {isLoading && !data && (<p>Loading plz wait...</p>)}

            {!isLoading && data && (

            <Row>

                <Col>
                    <FontAwesomeIcon size="lg" icon={faArrowLeft} onClick={() => navigate(-1)}/>
                    <div className='mt-3'>
                        <h5>{data.title}</h5>
                        <ul>
                            {data.exercises?.map(exercise => (
                                <li key={exercise.id}>{exercise.name}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
            )}
        </Container>
    )
}

export default WorkoutPage