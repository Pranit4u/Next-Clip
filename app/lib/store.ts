import { configureStore } from '@reduxjs/toolkit';
import clipsReducer from '@/app/lib/features/clips/clipsSlice'
import labelsReducer from '@/app/lib/features/labels/labelsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      clips: clipsReducer,
      labels: labelsReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']