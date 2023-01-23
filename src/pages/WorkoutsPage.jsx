import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { faPenToSquare, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthContext } from '../contexts/AuthContext'
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '../firebase'
import useGetUserWorkouts from '../hooks/useGetUserWorkouts'

const WorkoutsPage = () => {
    const { currentUser } = useAuthContext()
    const [edit, setEdit] = useState(false)
    const {data, isLoading} = useGetUserWorkouts(currentUser.uid, "workout")

    const deleteWorkout = async (value) => {
        const ref = doc(db, `users/${currentUser.uid}/workouts`, value.id)
        await deleteDoc(ref)
    }

    return (

        <Container>
            <Row>
                <Col xs={12}>
                    <Link to={`/muscles`}>
                        <div className='create-wrapper d-flex justify-content-center align-center py-3 my-5'>
                            <h5>Create new workout</h5>
                            <FontAwesomeIcon className="ms-3" size="xl" icon={faPlus} />
                        </div>
                    </Link>

                    <Tabs
                        defaultActiveKey="my workouts"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="my workouts" title="My Workouts">
                        
                        {isLoading && !data && (<p>Loading plz wait...</p>)}
                        
                        {!isLoading && data && (

                            <div>
                                {data.filter(d => d.premade == false).map(workout => (
                                    <div key={workout.id} className="d-flex justify-content-between workout-box mt-2">
                                        <Link className="w-50" to={`/workouts/${workout.id}`}><p>{workout.title}</p></Link>
                                        <p className='w-40'>{workout.exercises.length} exercises</p>
                                        {edit && (
                                            <FontAwesomeIcon className="w-10" size="lg" icon={faTrash} onClick={() => deleteWorkout(workout)}/>
                                        )}
                                    </div>
                                ))}
                                <div className="mt-3 w-100 text-end pe-1">
                                    <FontAwesomeIcon size="lg" icon={faPenToSquare} onClick={() => setEdit(!edit)} />
                                </div>
                            </div>
                        )}
                        </Tab>

                        <Tab eventKey="premade workouts" title="Sample ">
                        
                        {isLoading && !data && (<p>Loading plz wait...</p>)}
                        
                        {!isLoading && data && (
                            <div>
                                {data.filter(d => d.premade == true).map(workout => (
                                    <div key={workout.id} className="d-flex justify-content-between workout-box mt-2">
                                        <Link to={`/workouts/${workout.id}`}><p>{workout.title}</p></Link>
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