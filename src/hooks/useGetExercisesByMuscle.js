import useGetCollection from "./useGetCollection";

const useGetExercisesByMuscle = (value) => {
    return useGetCollection('muscles', value)
}

export default useGetExercisesByMuscle