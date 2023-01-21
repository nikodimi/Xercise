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
        <Container className="d-flex justify-content-center align-items-center flex-column">
            
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
                
                <Row>
                    <Col xs={12}>
                        <h4>Latest workouts</h4>
                            {data.filter(d => d.completed.length > 0).map((workout,i) => (
                                
                                <div key={i}>
                                    <h5>{workout.title}</h5>
                                    
                                    <p>{moment(workout.completed[0]?.toMillis()).format('YYYY-MM-DD')}</p>
                                </div>
                            ))}

                    </Col>
                </Row>
            )}

        </Container>
    );
}

export default HistoryPage