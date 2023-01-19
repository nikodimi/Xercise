import { Container, Row, Col, Button } from 'react-bootstrap'
import { useWorkoutStore } from "../store"
import { useState } from 'react'
import useGetMuscles from '../hooks/useGetMuscles'
import MuscleBoxMenu from '../components/MuscleBoxMenu'
import ModalList from '../components/ModalList'

const MusclesPage = () => {
    const { exercises } = useWorkoutStore()
    const {data, isLoading} = useGetMuscles()
    const [modalShow, setModalShow] = useState(false);

    return (
        <Container className='muscles-container d-flex justify-content-center align-items-center flex-column'>

            {isLoading && !data && (<p>Loading data...</p>)} 

            {!isLoading && data && (
                <MuscleBoxMenu data={data}/>
            )}

            {exercises.length >= 1 && (
                <Row>
                    <Col>
                        <div className='my-3'>
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                Go to Workout({exercises.length})
                            </Button>
                        </div>
                    </Col>

                    <ModalList show={modalShow} onHide={() => setModalShow(false)}/>
                </Row>
            )}

        </Container>
    )
}

export default MusclesPage