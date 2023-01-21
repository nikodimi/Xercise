import { updateDoc, doc, Timestamp } from '@firebase/firestore'
import { db } from '../firebase'
import { Container, Row, Col, Button, FormGroup, Form } from 'react-bootstrap'
import { useActiveWorkout } from '../ActiveWorkout'
import { useAuthContext } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const ActivePage = () => {
    const { id } = useParams()
    const { currentUser } = useAuthContext()
    const { activeWorkout, updateWorkout } = useActiveWorkout()
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')

    console.log('sets', sets)
    console.log('reps', reps)
    console.log('weight', weight)

    let newWorkout = activeWorkout
    console.log('newWorkout', newWorkout)

    const handleSet = (value) => {
        console.log('sets, newReps, newWeight, ExerciseNR', sets, reps, weight, value)

        for (let i = 0; i < sets; i++) {
            newWorkout.exercises[value].sets.push({
                repetitions: reps,
                weight: weight
            })
        }
        console.log('newWorkout', newWorkout)
        updateWorkout(newWorkout)
    }

    const finishWorkout = async() => {

        await updateDoc(doc(db, `users/${currentUser.uid}/workouts` , id), {
            title: activeWorkout.title,
            time: "",
            completed: [ 
                ...activeWorkout.completed, Timestamp.fromDate( new Date)
            ]
       })
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
            
            <Form className='mt-5'>
                <FormGroup>
                    <Row >
                        <Col xs={4}>
                            <Form.Control 
                                onChange={e => setSets(e.target.value)}
                                type="text" 
                                placeholder="0" 
                                required
                                maxLength={2}
                            />  
                        </Col>
                        <Col xs={4}>
                            <Form.Control 
                                onChange={e => setReps(e.target.value)}
                                type="text" 
                                placeholder="0" 
                                required
                                maxLength={2}
                            />  
                        </Col>                               
                        <Col xs={4}>
                            <Form.Control 
                                onChange={e => setWeight(e.target.value)}
                                type="text" 
                                placeholder="0"
                                required
                                maxLength={3}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                
            </Form>
    
            {activeWorkout.exercises?.map((exercise, i) => (
                <div className='exercise-wrapper mt-4 p-3'>
                    <Row className='d-flex justify-content-between' key={exercise.id}>
                        <Col xs={9} className="mb-2">
                            <div>
                                <h6>{exercise.name}</h6>
                            </div>
                        </Col>
                        <Col xs={3} className="mb-2">
                            <div>
                            <Button  onClick={() => handleSet(i)}>Add</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className='d-flex justify-content-between'>
                        <Col xs={3}>
                            <div>
                                <p className='w-100'>Sets</p>
                            </div> 
                        </Col>
                        <Col xs={4}> 
                            <div>
                                <p className='w-100'>Reps</p>
                            </div>
                        </Col>
                        <Col xs={5}>
                            <div>
                                <p className='w-100'>Kg</p>
                            </div>
                        </Col>
                    </Row>

                    {exercise.sets?.map((set, y) => (
                    
                        <Row key={y} className="mt-1">
                            <Col xs={3}>
                                <div className=''>
                                    <p>{y+1}</p>
                                </div>
                            </Col>
                            <Col xs={4}>
                                <div className=''>
                                    <p>{set.repetitions}</p>
                                </div>
                            </Col>                               
                            <Col xs={5}>
                                <div className=''>
                                    <p>{set.weight}</p>
                                </div>
                            </Col>
                        </Row>
                    ))}
                </div>
            ))} 

            <Button className="action-btn w-100 mt-4" disabled={!activeWorkout} onClick={() => finishWorkout(activeWorkout)}>Finish Workout</Button>
        </Container>
    )
}

export default ActivePage