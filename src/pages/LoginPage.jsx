import { useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginPage = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { login } = useAuthContext()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null);
  
    try {
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        navigate('/')
    } catch (err) {
        setError(err.message)
        setLoading(false)
    }
}

    return (
        <Container className='d-flex flex-column justify-content-center login-container'>
            <Row>
                <Col md={6} className='m-auto'>
                    <div className="login-wrapper">
            
                        {error && (<Alert variant='danger'>{error}</Alert>)}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='d-flex align-items-center form-group'>
                                <Form.Control type="email" placeholder="Email" ref={emailRef} required />
                                <FontAwesomeIcon 
                                    size="md" 
                                    icon={faUser}
                                    className="form-icon" 
                                />
                            </Form.Group>

                            <Form.Group className='d-flex align-items-center mt-3 form-group'>
                                <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                                <FontAwesomeIcon 
                                    size="md" 
                                    icon={faLock}
                                    className="form-icon" 
                                />
                            </Form.Group>

                            <Button className="login-btn w-100 mt-4" disabled={loading} type="submit">Log in</Button>
                        </Form>
                        
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage