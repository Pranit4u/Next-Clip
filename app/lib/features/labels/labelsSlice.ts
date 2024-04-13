import { createSlice } from '@reduxjs/toolkit'
import { LabelInterface } from '../../utils/definition';

export const clipsSlice = createSlice({
  name: 'labels',
  initialState: {
    value: [] as LabelInterface[],
  },
  reducers: {
    saveLabels: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveLabels } = clipsSlice.actions

export default clipsSlice.reducer