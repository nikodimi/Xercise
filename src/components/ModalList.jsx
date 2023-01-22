import { Button, Modal, Form } from 'react-bootstrap'
import { useWorkoutStore } from "../store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMinus } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { useActiveWorkout } from '../ActiveWorkout';
import { Link } from 'react-router-dom'

const ModalList = ({ show, onHide }) => {
    const { currentUser } = useAuthContext()
    const { resetWorkout, exercises, removeFromWorkout } = useWorkoutStore()
    const { register, handleSubmit, formState: { errors }} = useForm()
    const { addToActiveWorkout, activeWorkout } = useActiveWorkout()


    const removeExerciseFromWorkout = (exercise) => {
        removeFromWorkout(exercise)
    }

    const createEmptyWorkout = () => {
        const emptyWorkout = {
            title: 'Empty Workout',
            exercises: exercises,
            created: serverTimestamp(),
            completed: [],
            premade: false
        }
        addToActiveWorkout(emptyWorkout)
        resetWorkout()
    }

    const addToWorkouts = async(data) => {
        await addDoc(collection(db, `users/${currentUser.uid}/workouts`), {
            title: data.title,
            exercises: exercises,
            created: serverTimestamp(),
            completed: [],
            premade: false,
       })
       resetWorkout()
    }

    return (
        <Modal 
            show={show} 
            onHide={onHide}
            className="mt-3" 
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(addToWorkouts)}>
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
                    
                    {exercises && (
                        
                        <div className="modal-wrapper py-1 px-2">
                            {exercises.map(exercise => (
                                <div key={exercise.id} className='modal-item d-flex justify-content-between mt-4'>
                                    <p>{exercise.name}</p>
                                    <FontAwesomeIcon 
                                    size="lg" 
                                    icon={faMinus} 
                                    onClick={() => removeExerciseFromWorkout(exercise)}
                                />
                                </div>
                            ))}
                        </div>
                    )}
                    <Button className="action-btn save-btn w-100 mt-5" type="submit">Save Workout</Button>
                </Form>
                <div className='w-100 mt-3'>
                    <Button className="delete-btn w-100"  onClick={() => resetWorkout()}>Delete Workout</Button>
                </div>

                <div className='d-flex justify-content-center mt-4'>
                    <p>Or</p>
                </div>

                {/* {!activeWorkout && ( */}
                    <div className='mt-4'>
                        <Button className="action-btn w-100" onClick={() => createEmptyWorkout()}><Link to={`/active`}>Start Workout</Link></Button>
                    </div>
                {/* )} */}

                {/* {activeWorkout && (
                    <>
                        <div className='mt-3'>
                            <Button className="action-btn w-100" disabled={activeWorkout} onClick={() => createEmptyWorkout()}><Link to={`/active`}>Start Workout</Link></Button>
                        </div>
                        <div className='d-flex justify-content-evenly mt-2'>
                            <span>Workout already active</span>
                            <Link to={'/active'}><span className>-Go to workout-</span></Link> 
                        </div>
                    </>
                )} */}
                
                
            </Modal.Body>
        </Modal>
    )
}

export default ModalList