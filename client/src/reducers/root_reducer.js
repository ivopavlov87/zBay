import { combineReducers } from 'redux';
import homesReducer from './homes_reducer' 

const RootReducer = combineReducers({
    homes: homesReducer
})

export default RootReducer;