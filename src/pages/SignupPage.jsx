import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../contexts/AuthContext";
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignupPage = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const displayNameRef = useRef();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(false);
    const { signup, reloadUser } = useAuthContext();
    const navigate = useNavigate()

    const handleFileChange = (e) => {
        if (!e.target.files.length) {
            setPhoto(null);
            return;
        }

        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords does not match");
        }

        setError(null);

        try {
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, displayNameRef.current.value, photo);

            setLoading(false);

            await reloadUser()

            navigate('/profile')
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center signup-container">
            <Row>
                <Col md={6} className='m-auto'>
                    <div className="signup-wrapper">
                        
                        {error && (<Alert variant='danger'>{error}</Alert>)}

                        <Form onSubmit={handleSubmit}>

                            <Form.Group className='d-flex align-items-center form-group'>
                                <Form.Control type="text" placeholder="Username" ref={displayNameRef} required />
                                <FontAwesomeIcon 
                                    size="md" 
                                    icon={faUser}
                                    className="form-icon" 
                                />
                            </Form.Group>

                            <Form.Group className='d-flex align-items-center form-group mt-3'>
                                <Form.Control type="email" placeholder="Email" ref={emailRef} required />
                                <FontAwesomeIcon 
                                    size="md" 
                                    icon={faEnvelope}
                                    className="form-icon" 
                                />
                            </Form.Group>

                            <Form.Group id="photo" className="mt-3">
                                <Form.Control type="file" onChange={handleFileChange} />
                                <Form.Text>
                                    {photo
                                        ? `${photo.name} (${Math.round(photo.size / 1024)} kB)`
                                        : "No photo selected"}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className='d-flex align-items-center form-group mt-3'>
                                <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                                <FontAwesomeIcon 
                                    size="md" 
                                    icon={faLock}
                                    className="form-icon" 
                                />
                            </Form.Group>

                            <Form.Group id="password-confirm"  className='d-flex align-items-center form-group mt-3'>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm"
                                    ref={passwordConfirmRef}
                                    required
                                />
                                <FontAwesomeIcon 
                                    size="md" 
                                    icon={faLock}
                                    className="form-icon" 
                                />
                            </Form.Group>

                            <div className="d-flex mt-2">
                                <p>Already have an account?</p>
                                <Link className="ms-2 login-link" to="/login">Login here</Link>
                            </div> 

                            <Button className="action-btn w-100 mt-4" disabled={loading} type="submit">Sign up</Button>
                        </Form>
                        
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default SignupPage