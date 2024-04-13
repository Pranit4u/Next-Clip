import { createSlice } from '@reduxjs/toolkit'
import { ClipInterface } from '../../utils/definition';

export const clipsSlice = createSlice({
  name: 'clips',
  initialState: {
    value: [] as ClipInterface[],
  },
  reducers: {
    saveClips: (state, action) => {
      state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveClips } = clipsSlice.actions

export default clipsSlice.reducer