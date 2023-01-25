import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useActiveWorkout = create(
  persist(
    (set, get) => ({
      activeWorkout: {},
      showButton: false,
      addToActiveWorkout: (obj) => {
        set(() => {
          return {
            activeWorkout: obj,
            showButton:true
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
        set((state) => ({ ...state, activeWorkout: {}, showButton: false}))
    }),
    {
      name: 'active-workout'
    }
  )
)