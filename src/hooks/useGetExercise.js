import useGetDocument from "./useGetDocument";

const useGetExercise = (muscle, id) => {
    return useGetDocument(`muscles/${muscle}/exercises`, id)
}

export default useGetExercise