import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWorkoutStore = create(
  persist(
    (set, get) => ({
      exercises: [],
      addToWorkout: (exercise) => {
        set((state) => {
          const alreadyAdded = state.exercises.some(
            (entry) => entry.id === exercise.id
          )
          
          if (alreadyAdded) {
            return state
          }

          return {
            ...state,
            exercises: [...state.exercises, exercise],
          }
        })
      },
      removeFromWorkout: (exercise) => {
        set(() => {
          return {
            exercises: get().exercises.filter(
              (state) => state.id !== exercise.id
            ),
          }
        })
      },
      resetWorkout: () =>
        set((state) => ({ ...state, exercises: []}))
    }),
    {
      name: 'new-workout'
    }
  )
)