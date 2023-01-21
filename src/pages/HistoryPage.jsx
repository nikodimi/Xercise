import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import Calendar from 'react-calendar';
import useGetUserWorkouts from '../hooks/useGetUserWorkouts'
import moment from 'moment'
import 'react-calendar/dist/Calendar.css';

const HistoryPage = () => {
    const { currentUser } = useAuthContext()
    const [value, onChange] = useState(new Date());
    const {data, isLoading} = useGetUserWorkouts(currentUser.uid, "history")

    console.log('data', data)

    return (
        <Container className="d-flex align-items-center flex-column">
            
            <Row className='mt-4'>
                <Col xs={12}>
                    <div>
                        <Calendar onChange={onChange} value={value} />

                        {/* <TileContent /> */}
                    </div>
                </Col>
            </Row>

            {isLoading && !data && (<p>Loading plz wait...</p>)}
                        
            {!isLoading && data && (
                
                <Row className='w-100'>
                    <Col xs={12}>
                        <div className='workout-wrapper'>
                            <div className=''>
                                <h4>Latest workouts</h4>
                            </div>

                            {data.filter(d => d.completed.length > 0).map((workout,i) => (
                                <div key={i} className="workout-content mt-3">
                                    <div className="d-flex justify-content-between">
                                        <h5>{workout.title}</h5>
                                        <p>{moment(workout.completed[0]?.toMillis()).format('YYYY-MM-DD')}</p>
                                    </div>
                                    <div className='mt-2'>
                                        {workout.exercises.map((exercise,i) => (
                                            <div key={i} className="d-flex justify-content-between">
                                                <p>{exercise.sets.length} x </p>
                                                <p>{exercise.name}</p>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            )}

        </Container>
    );
}

export default HistoryPage