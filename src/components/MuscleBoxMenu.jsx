import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MuscleBoxMenu = ({data }) => {
  
    return (
        <Row>
            <Col xs={12} className="mb-3">
                <h5>Choose musclegroup</h5>
            </Col>
            {data.map(muscle => (
                <Col xs={6} key={muscle.id} className="py-1 muscle-box-wrapper">
                    <Link to={`/muscles/${muscle.name}`}>
                        <div className='muscle-box d-flex justify-content-center align-items-center mt-1'>
                            <h5>{muscle.id}</h5>
                        </div>
                    </Link>
                </Col>
            ))}
        </Row>
    )
}

export default MuscleBoxMenu