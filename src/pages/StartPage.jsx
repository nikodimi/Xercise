import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import LogoText from '../assets/images/logo-text.png'

const StartPage = () => {
    const navigate = useNavigate()

    setTimeout(() => {
        navigate('/signup')
    }, 3000)

    return (
        <Container className='d-flex justify-content-center align-items-center'>
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    <img className="logo" src={LogoText} alt="" />
                </Col>
            </Row>
        </Container>
    )
}

export default StartPage