import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  service: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
  },
}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setService: (state, action) => {
      state.service = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setService } = serviceSlice.actions
export const selectService = (state) => state.service.service

export default serviceSlice.reducer
