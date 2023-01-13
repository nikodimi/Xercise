import { Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import SingleWorkout from '../components/SingleWorkout'
import useGetUserWorkouts from '../hooks/useGetUserWorkouts'

const WorkoutsPage = () => {
    const { currentUser } = useAuthContext()
    const [workout, setWorkout] = useState()
    const {data, isLoading} = useGetUserWorkouts(currentUser.uid)
    const [searchParams, setSearchParams] = useSearchParams({
        workout_id: ""
    })

    const handleClick = (value) => {
        setSearchParams({
            workout_id: value.id
        })
        setWorkout(value)
    }

    return (

        <Container>

            {isLoading && !data && (<p>Loading plz wait...</p>)}

            {!isLoading && data && !workout && (
                <Row>
                    <h4 className='my-3'>
                        My Exercises
                    </h4>
                        {data.map(workout => (
                            <Col xs={12} key={workout.id}>
                                <div onClick={() => handleClick(workout)}>
                                    <h5>{workout.title}</h5>
                                    <p>{workout.exercises.length} exercises</p>
                                </div>
                            </Col>
                        ))}
                </Row>
            )}

            {workout && (
                <SingleWorkout data={workout}/>
            )}                    

        </Container>
    )
}

export default WorkoutsPage