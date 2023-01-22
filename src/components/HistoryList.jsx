import { Row, Col } from 'react-bootstrap'
import moment from 'moment'

const HistoryList = ({ data }) => {
    return (
        <Row className='w-100'>
            <Col xs={12}>

                <div className='mt-3 latest-header'>
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
                                <div key={i} className="d-flex">
                                    <p>{exercise.sets.length} x</p>
                                    <p className='ps-1'>{exercise.name}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                ))}

            </Col>
        </Row>
    )
}

export default HistoryList