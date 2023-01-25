import { useRef, useState} from 'react'
import { Container, Row, Col, Form, Button, Alert, Image } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfilePage = () => {
    const displayNameRef = useRef();
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [photo, setPhoto] = useState(null);
    const { 
        currentUser,
        reloadUser,
        setDisplayNameAndPhoto, 
        updateUser
    } = useAuthContext()

    const handleFileChange = (e) => {
        if (!e.target.files.length) {
            setPhoto(null);
            return;
        }

        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
		e.preventDefault()

        setError(null);

        try {
			setLoading(true)

            if (displayNameRef.current.value !== currentUser.displayName || photo) {
                await setDisplayNameAndPhoto(displayNameRef.current.value, photo)
            }

            await reloadUser()
            await updateUser()
            setLoading(false)

        } catch (err) {
			setError(err.message)
			setLoading(false)
		}
    }

    return (
        <Container className="profile-container d-flex flex-column justify-content-center">
            <Row>
                <Col md={6} className='m-auto'>
                    <div className="update-wrapper">

                    {error && (<Alert variant='danger'>{error}</Alert>)}

                        <Form onSubmit={handleSubmit}>

                            <div className='d-flex justify-content-center'>
                                <Image
                                    className="profile-image"
                                    src={currentUser.photoURL || 'https://via.placeholder.com/150'}
                                    fluid
                                    roundedCircle
                                />
                            </div>

                            <Form.Group className="d-flex justify-content-center align-items-center form-group mt-3">
                                <Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName} />
                                <FontAwesomeIcon 
                                    size="lg" 
                                    icon={faUser}
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
							
                            <Button className="action-btn w-100 mt-2" disabled={loading} type="submit">Update Profile</Button>

                        </Form>
                        
                    </div>

                    <div className='mt-3'>
						<Link to="/logout">
                            <Button className="action-btn logout-btn w-100" disabled={loading}>Log out</Button>
                            
                        </Link>
                    </div>    
                </Col>
            </Row>
        </Container>    
    )
}

export default ProfilePage