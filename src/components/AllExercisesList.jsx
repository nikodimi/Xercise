import { useSearchParams } from "react-router-dom"
import useGetAllExercises from "../hooks/useGetAllExercises"
import SingleExercise from "./SingleExercise"

const AllExercisesList = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        muscleGroup: "",
        id: ""
    })

    const {data, isLoading} = useGetAllExercises()

    let id = searchParams.get('id')
    
    const handleClick = (idValue, muscleValue) => {
        setSearchParams({
            muscleGroup: muscleValue,
            id: idValue
        })
    }

    return (
        <>
            {isLoading && !data && (<p>Loading data...</p>)}

            {!isLoading && data && (
                <div>
                    {data.map(exercise => (
                        <div key={exercise.id} className="exercise-item" onClick={() => handleClick(exercise.id, exercise.musclegroup)}>
                            <h5>{exercise.name}</h5>
                        </div>
                    ))}
                </div>
            )}

            {data && id && (<SingleExercise id={id}/>)}
        </>
    )
}

export default AllExercisesList