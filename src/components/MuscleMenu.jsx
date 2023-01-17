import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const MuscleMenu = ({data}) => {

    return (
        <Row className="scrollbar">
            {data.map(muscle => (
                <Col xs={4} className="scrollbar-item" key={muscle.id} >
                    <Link to={`/muscles/${muscle.name}`}>
                        <h5>{muscle.id}</h5>
                    </Link>
                </Col>
            ))}
        </Row>
    )
}

export default MuscleMenu