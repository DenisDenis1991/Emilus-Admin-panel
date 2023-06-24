import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import userSlice from './slices/userSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        userSlice,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
