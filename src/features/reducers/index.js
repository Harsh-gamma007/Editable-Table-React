import customerReducer from './list'

import { combineReducers } from '@reduxjs/toolkit'

const rootReducers = combineReducers({
    customerReducer,
})

export default rootReducers
