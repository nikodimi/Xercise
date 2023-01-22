import { Container, Row, Col, Button } from 'react-bootstrap'
import { faArrowLeft, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useState } from 'react';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore'
import { db } from '../firebase'
import useGetWorkout from '../hooks/useGetWorkout'
import { useActiveWorkout } from '../ActiveWorkout';
import moment from 'moment'

const WorkoutPage = () => {
    const { id } = useParams()
    const { currentUser } = useAuthContext()
    const { data, isLoading } = useGetWorkout(currentUser.uid, id)
    const [edit, setEdit] = useState(false)
    const { addToActiveWorkout, activeWorkout, resetActiveWorkout } = useActiveWorkout()
    const navigate = useNavigate()

    const deleteExercise = async (value) => {
        const ref = doc(db, `users/${currentUser.uid}/workouts`, id)
        await updateDoc(ref, {
            exercises: arrayRemove(value)
        })
    }
    console.log('workout', activeWorkout)

    const handleClick = (value) => {
        console.log('value', value)
        addToActiveWorkout(value)
    }

    return (
        <Container className='mt-3'>

            {isLoading && !data && (<p>Loading plz wait...</p>)}

            {!isLoading && data && (

            <Row>
                <Col xs={12}>
                    <FontAwesomeIcon size="lg" icon={faArrowLeft} onClick={() => navigate(-1)}/>
                    <div className='mt-3'>
                        <div className='d-flex justify-content-between'>
                            <h5>{data.title}</h5>
                            <FontAwesomeIcon size="lg" icon={faPenToSquare} onClick={() => setEdit(!edit)} />
                        </div>
                        
                        {data.exercises?.map((exercise, i) => (
                            
                            <div key={i} className="mt-4">
                                <div className="d-flex justify-content-between">
                                    <h6>{exercise.name}</h6>
                                    {edit && (
                                        <FontAwesomeIcon size="sm" icon={faTrash} onClick={() => deleteExercise(exercise)}
                                        />
                                    )}
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p>{moment(data.completed[0]?.toMillis()).format('YYYY-MM-DD')}</p>
                                </div>

                                {exercise.sets.map((set,i) => (
                                    <div key={i} className='d-flex'>
                                        <p>{set.repetitions}x</p>
                                        <p>{set.weight}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </Col>
                
                <Col xs={12}>
                    <div className='mt-5'>
                        {/* <Button className="action-btn w-100" disabled={!activeWorkout.length} onClick={() => {handleClick(data)} }>
                            <Link to={`/active`}>Start workout</Link>
                        </Button>
                        
                        {activeWorkout.length && (
                            <Link to={`/active`}>
                                <Button className="action-btn w-100 mt-4">Go to Started workout</Button>
                            </Link>
                        )} */}
                        {/* <Button className="action-btn w-100 mt-4" onClick={() => resetActiveWorkout()}>Reset</Button> */}

                    </div>
                </Col>
            </Row>
            )}

        </Container>
    )
}

export default WorkoutPage