import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useActiveWorkout } from '../zustand/ActiveWorkout'
import { useState } from 'react'
import ModalWorkout from '../components/ModalWorkout'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActivePage = () => {

    const [modalShow, setModalShow] = useState(false);
    const { activeWorkout, updateWorkout } = useActiveWorkout()

    let newWorkout = activeWorkout

    const handleSet = (value) => {
        const getLength = newWorkout.exercises[value].sets.length
        const getLastSet = newWorkout.exercises[value].sets[getLength-1]

        if (getLastSet.repetitions != 0) {
            newWorkout.exercises[value].sets.push({
                weight: getLastSet.weight,
                repetitions: getLastSet.repetitions
            })
            updateWorkout(newWorkout)
        } 
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
        <>

            <Container className='small-container'>
                <Row className='mt-4'>
                    <Col xs={12}>
                        <div>
                            <h2 className="text-white text-uppercase">{activeWorkout.title}</h2>
                        </div>
                    </Col>
                </Row>
    
                {activeWorkout.exercises?.map((exercise, i) => (
                    <div key={i} className='exercise-wrapper mt-5'>
                        <Row className='' key={exercise.id}>
                            <Col xs={12} className="mb-2">
                                <div>
                                    <h6 className="text-white fw-bold text-uppercase">{exercise.name}</h6>
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
                                <Col xs={2} className="pt-3">
                                
                                    {activeWorkout.exercises[i].sets.length > 1 &&  (

                                        <FontAwesomeIcon 
                                            size="lg" 
                                            icon={faTrash}
                                            onClick={() => deleteSet(i,y)}
                                        />

                                    )}
                                </Col>

                                {activeWorkout.exercises[i].sets.length === y+1 && (
                                    <Row className='mt-3'>
                                        <Col xs={12}className=''>
                                            <div className='text-center'>
                                                <p className="text-uppercase fw-bold" onClick={() => handleSet(i)}>Add set+</p>
                                            </div>
                                        </Col>
                                    </Row>
                                )}
                            </Row>
                        ))}
                    </div>
                ))} 
            </Container>

            <Container className='button-container'>
                <Row>
                    <Col xs={12}>
                        <div>
                            <Button className="action-btn text-center w-100" onClick={() => setModalShow(true)}>
                                Finish Workout
                            </Button>

                        </div>
                    </Col>
                </Row>

                <ModalWorkout show={modalShow} onHide={() => setModalShow(false)}/>
                
            </Container>
        </>
    )
}

export default ActivePage