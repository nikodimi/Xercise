import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { Container, Row, Col } from 'react-bootstrap'

const LogoutPage = () => {
    const Navigate = useNavigate()
    const { logout } = useAuthContext()
 
    useEffect(() => {
        const logoutUser = async () => {
            await logout()
            Navigate('/')
        }
        logoutUser()
    },[])
 
    return (
        <Container className='d-flex flex-column justify-content-center flex-grow-1'>
            <Row>
                <Col md={6} className='m-auto'>
                    <p>Wait for log out</p>
                </Col>
            </Row>
        </Container>
    )
}
 
export default LogoutPage