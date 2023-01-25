import { Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useGetMuscles from '../hooks/useGetMuscles'

const MuscleMenu = () => {
    const {data, isLoading} = useGetMuscles()

    return (
        
        <>
            {isLoading && !data && (<p>Loading data...</p>)} 

            {!isLoading && data && (
            
            <Row className="scrollbar">
                {data.map(muscle => (
                    <Button className="scrollbar-btn" key={muscle.id} >
                        <Link to={`/muscles/${muscle.name}`}>
                            <h5>{muscle.id}</h5>
                        </Link>
                    </Button>
                ))}
            </Row>

            )}
        </>
        

    )
}

export default MuscleMenu