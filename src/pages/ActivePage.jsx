import { updateDoc, doc, Timestamp } from '@firebase/firestore'
import { db } from '../firebase'
import { Container, Row, Col, Button, FormGroup, Form } from 'react-bootstrap'
import { useActiveWorkout } from '../ActiveWorkout'
import { useAuthContext } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const ActivePage = () => {
    // const { id } = useParams()
    const { currentUser } = useAuthContext()
    const { activeWorkout, updateWorkout } = useActiveWorkout()
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')

    let newWorkout = activeWorkout

    const handleSet = (value) => {
        newWorkout.exercises[value].sets.push({
            repetitions: reps,
            weight: weight
        })
        updateWorkout(newWorkout)
    }

    const finishWorkout = async() => {
        await updateDoc(doc(db, `users/${currentUser.uid}/workouts` , activeWorkout.id), {
            title: activeWorkout.title,
            time: "",
            exercises: 
                activeWorkout.exercises
            ,
            completed: [ 
                ...activeWorkout.completed, Timestamp.fromDate( new Date)
            ]
       })
    }

    const deleteSet = (a, b) =>{
        newWorkout.exercises[a].sets.splice(b, 1)
        updateWorkout(newWorkout)
    }

    return (
        <Container>
            <Row className='mt-4'>
                <Col xs={12}>
                    <div>
                        <h5>{activeWorkout.title}</h5>
                    </div>
                </Col>
            </Row>
 
            {activeWorkout.exercises?.map((exercise, i) => (
                <div className='exercise-wrapper mt-4 p-3'>
                    <Row className='' key={exercise.id}>
                        <Col xs={12} className="mb-2">
                            <div>
                                <h6>{exercise.name}</h6>
                            </div>
                        </Col>
                    </Row>
                    <Row className=' mt-3 mb-3'>
                        <Col xs={2} className="">
                            <div>
                                <p className='w-100'>Sets</p>
                            </div> 
                        </Col>
                        <Col xs={4}> 
                            <div>
                                <p className='w-100'>Reps</p>
                            </div>
                        </Col>
                        <Col xs={4}>
                            <div>
                                <p className='w-100'>Kg</p>
                            </div>
                        </Col>
                        <Col xs={2}>
                            <div>
                            </div>
                        </Col>
                    </Row>

                    {exercise.sets?.map((set, y) => (
                    
                        <Row key={y} className="mt-1">
                            <Col xs={2}>
                                <div className='d-flex align-items-center h-100'>
                                    <p>{y+1}</p>
                                </div>
                            </Col>
                            <Col xs={4}>
                                <Form.Control 
                                    onChange={e => setReps(e.target.value)}
                                    type="text" 
                                    placeholder={set.repetitions}
                                    required
                                    maxLength={2}
                                />  
                            </Col>                               
                            <Col xs={4}>
                                <Form.Control 
                                    onChange={e => setWeight(e.target.value)}
                                    type="text" 
                                    placeholder={set.weight}
                                    required
                                    maxLength={3}
                                />
                            </Col>
                            <Col xs={2} className="d-flex align-items-center">
                                <div>
                                    <Button onClick={() => deleteSet(i,y)}>X</Button>
                                </div>
                            </Col>

                            {activeWorkout.exercises[i].sets.length === y+1 && (
                                <Row className='mt-3'>
                                    <Col xs={12}className=''>
                                        <div>
                                            <p onClick={() => handleSet(i)}>+</p>
                                        </div>
                                    </Col>
                                </Row>
                            )}

                        </Row>
                    ))}
                </div>
            ))} 

            <Button className="action-btn w-100 mt-4" disabled={!activeWorkout} onClick={() => finishWorkout(activeWorkout)}>Finish Workout</Button>
        </Container>
    )
}

export default ActivePage