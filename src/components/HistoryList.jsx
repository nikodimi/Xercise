import { Row, Col } from 'react-bootstrap'
import moment from 'moment'

const HistoryList = ({ data }) => {
    return (
        <Row className='w-100 py-2'>
            <Col xs={12}>

                <div className='mt-3 latest-header'>
                    <h3 className='text-white text-uppercase'>Latest workouts</h3>
                </div>

                {data.filter(d => d.completed.length > 0).map((workout,i) => (
                    <div key={i} className="workout-content mt-3">
                        <div className="d-flex justify-content-between">
                            <h6 className='text-uppercase text-white fw-bold'>{workout.title}</h6>
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