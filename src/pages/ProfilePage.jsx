import { useRef, useState} from 'react'
import { Container, Row, Col, Form, Button, Alert, Image } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

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
        console.log("File changed!", e.target.files[0]);
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
        <Container>
            <Row>
                <Col md={6} className='m-auto'>
                    <div className="update-wrapper">
                        <h5 className='mb-4'>Profile page</h5>

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

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" ref={displayNameRef} defaultValue={currentUser.displayName} />
                            </Form.Group>

                            <Form.Group id="photo" className="mb-3">
                                <Form.Label>Photo</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange} />
                                <Form.Text>
                                    {photo
                                        ? `${photo.name} (${Math.round(photo.size / 1024)} kB)`
                                        : "No photo selected"}
                                </Form.Text>
                            </Form.Group>
							
							<div className="text-center">
                            	<Button variant="dark" disabled={loading} type="submit">Update Profile</Button>
							</div>
                        </Form>
                        
                    </div>

                    <div className='mt-5 text-center'>
						<Link to="/logout"><Button variant="danger">Logout</Button></Link>
                    </div>    
                </Col>
            </Row>
        </Container>    
    )
}

export default ProfilePage