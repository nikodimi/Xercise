import useGetDocument from "./useGetDocument";

const useGetWorkout = (user_id, id) => {
    return useGetDocument(`users/${user_id}/workouts`, id)
}

export default useGetWorkout