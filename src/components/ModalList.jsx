import { Button, Modal, Form } from 'react-bootstrap'
import { useWorkoutStore } from "../store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMinus } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const ModalList = ({ show, onHide }) => {
    const { currentUser } = useAuthContext()
    const { resetWorkout, exercises, removeFromWorkout } = useWorkoutStore()

    const removeExerciseFromWorkout = (exercise) => {
        removeFromWorkout(exercise)
    }

    const addToWorkouts = async(workout) => {
        await addDoc(collection(db, `users/${currentUser.uid}/workouts`), {
            title: "",
            time: "",
            exercises: workout,
            created_at: serverTimestamp(),
            completed_at: []
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
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control
                            type="email"
                            placeholder="Name your workout"
                            required
                        />
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className='w-100'>
                    <Button className="save-btn w-100" onClick={() => addToWorkouts(exercises)}>Save workout</Button>
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