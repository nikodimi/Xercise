import useGetExercisesByMuscle from "../hooks/useGetExercisesByMuscle"
import { useSearchParams } from "react-router-dom"

const ExerciseByMuscleList = ({ muscle }) => {
    const [searchParams, setSearchParams] = useSearchParams({
        muscleGroup: muscle,
        id: ""
    })

    const {data, isLoading} = useGetExercisesByMuscle(muscle)

    const handleClick = (value) => {
        setSearchParams({
            muscleGroup: muscle,
            id: value
        })
    }

    return (
        <>
            {isLoading && !data && (<p>Loading data...</p>)}

            {data && (
                <div>
                    {data.map(exercise => (
                        <div key={exercise.id} className="exercise-item" onClick={() => handleClick(exercise.id)}>
                            <h5>{exercise.name}</h5>
                            <p>{exercise.category}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ExerciseByMuscleList