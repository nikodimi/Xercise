import { useSearchParams } from "react-router-dom"

const AllExercisesList = ({ data }) => {
    const [searchParams, setSearchParams] = useSearchParams({
        muscleGroup: "",
        id: ""
    })

    const handleClick = (value, category) => {
        setSearchParams({
            muscleGroup: category,
            id: value
        })
    }

    return (
        <>
            {!data && (<p>Loading data...</p>)}

            {data && (
                <div>
                    {data.map(exercise => (
                        <div key={exercise.id} className="exercise-item" onClick={() => handleClick(exercise.id, exercise.category)}>
                            <h5>{exercise.name}</h5>
                            <p>{exercise.category}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default AllExercisesList