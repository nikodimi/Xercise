// import useGetCollection from "./useGetCollection";
import useGetDocument from "./useGetDocument";

const useGetExercise = (id) => {
    return useGetDocument('exercises', id)
}

export default useGetExercise