import { configureStore } from '@reduxjs/toolkit'
import basketReducer from './features/basketSlice'
import serviceReducer from './features/serviceSlice'

export default configureStore({
  reducer: {
    basket: basketReducer,
    service: serviceReducer,
  },
})
