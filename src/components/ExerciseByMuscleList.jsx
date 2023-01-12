import useGetExercisesByMuscle from "../hooks/useGetExercisesByMuscle"
import SingleExercise from "./SingleExercise"
import { useSearchParams } from "react-router-dom"

const ExerciseByMuscleList = ({ muscle }) => {
    const [searchParams, setSearchParams] = useSearchParams({
        muscleGroup: muscle,
        id: ""
    })

    let id = searchParams.get('id')
    const {data, isLoading} = useGetExercisesByMuscle(muscle)

    const handleClick = (id) => {
        setSearchParams({
            muscleGroup: muscle,
            id: id
        })
    }

    return (
        <>
            {isLoading && !data && (<p>Loading data...</p>)}

            {data && !id && (
                <div>
                    {data.map(exercise => (
                        <div key={exercise.id} className="exercise-item d-flex justify-content-between my-3">
                            <h5 onClick={() => handleClick(exercise.id)}>{exercise.name}</h5>
                        </div>
                    ))}
                </div>
            )}

            {data && id && (<SingleExercise muscle={muscle} id={id} />)}
        </>
    )
}

export default ExerciseByMuscleList