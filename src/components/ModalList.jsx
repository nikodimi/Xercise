import { Button, Modal, Form } from 'react-bootstrap'
import { useWorkoutStore } from "../store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMinus } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'

const ModalList = ({ show, onHide }) => {
    const { currentUser } = useAuthContext()
    const { resetWorkout, exercises, removeFromWorkout } = useWorkoutStore()
    const { register, handleSubmit, formState: { errors }} = useForm()

    const removeExerciseFromWorkout = (exercise) => {
        removeFromWorkout(exercise)
    }

    const addToWorkouts = async(data) => {
        await addDoc(collection(db, `users/${currentUser.uid}/workouts`), {
            title: data.title,
            time: "",
            exercises: exercises,
            created: serverTimestamp(),
            completed: []
       })
       resetWorkout()
    }

    return (
        <Modal 
            show={show} 
            onHide={onHide}
            className="mt-3" 
        >
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
                            placeholder="Enter a title if you wanna save"
                            type="text"
                        />
                        {errors.title && <div>{errors.title.message}</div>}
                    </Form.Group>
                    
                    {exercises && (
                        
                        <div className="modal-wrapper">
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
                    <Button className="save-btn w-100" type="submit">Save workout</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className='w-100'>
                    <Button className="reset-btn w-100 mt-3" variant="danger" onClick={() => resetWorkout()}>Delete Workout</Button>
                </div>
                <Button className='w-100 mt-2' onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalList