import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import Calendar from 'react-calendar';
import useGetUserWorkouts from '../hooks/useGetUserWorkouts'
import 'react-calendar/dist/Calendar.css';
import HistoryList from '../components/HistoryList';

const HistoryPage = () => {
    const { currentUser } = useAuthContext()
    const [value, onChange] = useState(new Date());
    const {data, isLoading} = useGetUserWorkouts(currentUser.uid, "history")


    return (
        <Container className="d-flex align-items-center flex-column">
            
            <Row className='mt-4'>
                <Col xs={12}>
                    <div>
                        <Calendar onChange={onChange} value={value} />
                    </div>
                </Col>
            </Row>

            {isLoading && !data && (<p>Loading plz wait...</p>)}
                        
            {!isLoading && data && (
                
                <HistoryList data={data} />
            )}

        </Container>
    );
}

export default HistoryPage