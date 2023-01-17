import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthContext } from '../contexts/AuthContext'
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '../firebase'
import useGetUserWorkouts from '../hooks/useGetUserWorkouts'

const WorkoutsPage = () => {
    const { currentUser } = useAuthContext()
    const [edit, setEdit] = useState(false)
    const {data, isLoading} = useGetUserWorkouts(currentUser.uid)

    const deleteWorkout = async (value) => {
        const ref = doc(db, `users/${currentUser.uid}/workouts`, value.id)
        await deleteDoc(ref)
    }

    return (

        <Container>
            <Row>
                <Col xs={12}>
                    <Tabs
                        defaultActiveKey="my workouts"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="my workouts" title="My Workouts">
                        
                        {isLoading && !data && (<p>Loading plz wait...</p>)}
                        
                        {!isLoading && data && (

                            <div className='text-end'>
                                <FontAwesomeIcon size="lg" icon={faPenToSquare} onClick={() => setEdit(!edit)} />
                                {data.filter(d => d.premade != "yes").map(workout => (
                                    <div key={workout.id} className="d-flex justify-content-between workout-box mt-2">
                                        <Link to={`/workouts/${workout.id}`}><h5>{workout.title}</h5></Link>
                                        <p>{workout.exercises.length} exercises</p>
                                        {edit && (
                                            <FontAwesomeIcon size="lg" icon={faTrash} onClick={() => deleteWorkout(workout)}/>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        </Tab>

                        <Tab eventKey="premade workouts" title="Premade Workouts">
                        
                        {isLoading && !data && (<p>Loading plz wait...</p>)}
                        
                        {!isLoading && data && (
                            <div>
                                {data.filter(d => d.premade == "yes").map(workout => (
                                    <div key={workout.id} className="d-flex justify-content-between workout-box mt-2">
                                        <Link to={`/workouts/${workout.id}`}><h5>{workout.title}</h5></Link>
                                        <p>{workout.exercises.length} exercises</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        </Tab>
                    </Tabs>         
                </Col>
            </Row>
        </Container>
    )
}

export default WorkoutsPage