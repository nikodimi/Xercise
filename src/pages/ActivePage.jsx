import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useActiveWorkout } from '../ActiveWorkout'
import { useState } from 'react'
import ModalWorkout from '../components/ModalWorkout'

const ActivePage = () => {

    const [modalShow, setModalShow] = useState(false);
    const { activeWorkout, updateWorkout } = useActiveWorkout()

    let newWorkout = activeWorkout

    const handleSet = (value) => {
        const getLength = newWorkout.exercises[value].sets.length
        const getLastSet = newWorkout.exercises[value].sets[getLength-1]
        newWorkout.exercises[value].sets.push({
            weight: getLastSet.weight,
            repetitions: getLastSet.repetitions
        })
        updateWorkout(newWorkout)
    }
    const updateWeight = (a, b, value) => {
        newWorkout.exercises[a].sets[b].weight = value
        updateWorkout(newWorkout)
    }

    const updateReps = (a, b, value) => {
        newWorkout.exercises[a].sets[b].repetitions = value
        updateWorkout(newWorkout)
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
                <div key={i} className='exercise-wrapper mt-4 p-3'>
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
                                    onChange={e => updateReps(i,y,e.target.value)}
                                    type="number" 
                                    placeholder={set.repetitions}
                                    maxLength={2}
                                />  
                            </Col>                               
                            <Col xs={4}>
                                <Form.Control 
                                    onChange={e => updateWeight(i,y,e.target.value)}
                                    type="number" 
                                    placeholder={set.weight}
                                    maxLength={3}
                                />
                            </Col>
                            <Col xs={2} className="d-flex align-items-center">
                                <div>
                                    {activeWorkout.exercises[i].sets.length > 1 &&  (
                                        <Button onClick={() => deleteSet(i,y)}>X</Button>
                                    )}
                                </div>
                            </Col>

                            {activeWorkout.exercises[i].sets.length === y+1 && (
                                <Row className='mt-3'>
                                    <Col xs={12}className=''>
                                        <div className='text-center'>
                                            <p onClick={() => handleSet(i)}>Add set+</p>
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Row>
                    ))}
                </div>
            ))} 
            <Row>
                <Col xs={12}>
                    <div>
                        <Button className="action-btn modal-btn text-center" onClick={() => setModalShow(true)}>
                            Finish Workout
                        </Button>

                    </div>
                </Col>
            </Row>

            <ModalWorkout show={modalShow} onHide={() => setModalShow(false)}/>
            
        </Container>
    )
}

export default ActivePage