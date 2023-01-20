import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useActiveWorkout = create(
  persist(
    (set, get) => ({
      activeWorkout: {},
      addToActiveWorkout: (obj) => {
        set(() => {

          return {
            activeWorkout: obj
          }
        })
      },
      updateWorkout: (value) => {
        set(() => {
            return {
                activeWorkout: value
            }
              
        })
      },
      resetActiveWorkout: () =>
        set((state) => ({ ...state, activeWorkout: {}}))
    }),
    {
      name: 'active-workout'
    }
  )
)