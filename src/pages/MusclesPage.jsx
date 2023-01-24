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
        <>
            <Container className={exercises.length ? 'small-container d-flex justify-content-center align-items-center flex-column' : 'd-flex justify-content-center align-items-center flex-column'}>

                {isLoading && !data && (<p>Loading data...</p>)} 

                {!isLoading && data && (
                    <MuscleBoxMenu data={data}/>
                )}

            </Container>
            
            {exercises.length >= 1 && (
                <Container className='button-container'>
                    <Row className='w-100'>
                        <Col className='w-100 p-0'>
                            <div className='w-100 ms-1 ps-1'>
                                <Button className='action-btn w-100' onClick={() => setModalShow(true)}>
                                    Go to Workout({exercises.length})
                                </Button>
                            </div>
                        </Col>

                        <ModalList show={modalShow} onHide={() => setModalShow(false)}/>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default MusclesPage