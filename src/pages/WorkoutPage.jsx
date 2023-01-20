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

    const handleClick = (value) => {
        console.log('value', value)
        addToActiveWorkout(value)
    }

    return (
        <Container className='mt-3'>

            {isLoading && !data && (<p>Loading plz wait...</p>)}

            {!isLoading && data && (

            <Row>
                <Col>
                    <FontAwesomeIcon size="lg" icon={faArrowLeft} onClick={() => navigate(-1)}/>
                    <div className='mt-3'>
                        <div className='d-flex justify-content-between'>
                            <h5>{data.title}</h5>
                            <FontAwesomeIcon size="lg" icon={faPenToSquare} onClick={() => setEdit(!edit)} />
                        </div>
                        {data.exercises?.map(exercise => (
                            <div key={exercise.id} className="d-flex justify-content-between mt-4">
                                <h6>{exercise.name}</h6>
                                {edit && (
                                    <FontAwesomeIcon size="lg" icon={faTrash} onClick={() => deleteExercise(exercise)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <Button disabled={!activeWorkout} onClick={() => handleClick(data)}><Link to={`/active/${data.id}`}>STARTA HÄR</Link></Button>
                    <Button onClick={() => resetActiveWorkout()}>Reset</Button>
                </Col>
            </Row>
            )}

        </Container>
    )
}

export default WorkoutPage