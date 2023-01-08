import useGetCollection from "./useGetCollection";

const useGetExercisesByMuscle = (value) => {
    return useGetCollection('exercises', value)
}

export default useGetExercisesByMuscle