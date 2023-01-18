import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MuscleBoxMenu = ({data }) => {
  
    return (
        <Row>
            {data.map(muscle => (
                <Col xs={6} key={muscle.id} className="p-1">
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