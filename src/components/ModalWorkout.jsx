import { Button, Modal, Form} from 'react-bootstrap'
import { updateDoc, addDoc, doc, collection, Timestamp, serverTimestamp } from '@firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'
import { useActiveWorkout } from '../zustand/ActiveWorkout';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const ModalWorkout = ({ show, onHide }) => {
    const { activeWorkout, resetActiveWorkout } = useActiveWorkout()
    const { currentUser } = useAuthContext()
    const { register, handleSubmit, formState: { errors }} = useForm()
    const Navigate = useNavigate()

    const finishWorkout = async() => {
        await updateDoc(doc(db, `users/${currentUser.uid}/workouts` , activeWorkout.id), {
            title: activeWorkout.title,
            time: "",
            premade: activeWorkout.premade,
            exercises: 
                activeWorkout.exercises
            ,
            completed: [ 
                ...activeWorkout.completed, Timestamp.fromDate( new Date)
            ]
       })
       resetActiveWorkout()
       Navigate('/workouts')
    }

    const saveWorkout = async(data) => {
        console.log('data', data)
        await addDoc(collection(db, `users/${currentUser.uid}/workouts`), {
            title: data.title,
            exercises: activeWorkout.exercises,
            created: serverTimestamp(),
            completed: [ 
                Timestamp.fromDate( new Date)
            ],
            premade: false,
       })
       resetActiveWorkout()
       Navigate('/workouts')
    }

    const closeWorkout = () => {
        resetActiveWorkout()
        Navigate('/muscles')
    }

    return (
        <Modal 
            show={show} 
            onHide={onHide}
            className="mt-3" 
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <h5>Workout Summary</h5>
            </Modal.Header>
            
            <Modal.Body>

                {activeWorkout.premade === true || activeWorkout.title =="Empty Workout" && (
                    <Form onSubmit={handleSubmit(saveWorkout)}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                {...register("title", {
                                    required: "Please enter a title",
                                    minLength: {
                                        value: 2,
                                        message: "A little longer plz"
                                    }
                                })}
                                placeholder="Enter a Title "
                                type="text"
                            />
                            {errors.title && <div>{errors.title.message}</div>}
                        </Form.Group>

                        <div className='w-100 mt-3'>
                            <Button className="action-btn w-100" type="submit">Save Workout</Button>
                        </div>
                    </Form>
                )}
                
                {activeWorkout.id && (
                    <div className='w-100 mt-3'>
                        <Button className="action-btn w-100" onClick={() => finishWorkout(activeWorkout)}>Finish Workout</Button>
                    </div>
                )}

                {!activeWorkout.id && (
                    <div className='d-flex justify-content-center mt-4'>
                        <Button className="action-btn w-100" onClick={() => closeWorkout()}>Finish Workout</Button>         
                    </div>
                )}

                
            </Modal.Body>
        </Modal>
    )
}

export default ModalWorkout