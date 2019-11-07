import {
    RECEIVE_HOMES
} from '../actions/home_actions'


const homesReducer = (state = {}, action) => {
    Object.freeze(state)
    
    switch (action.type) {
        case RECEIVE_HOMES:
            return action.homes
        default:
            return state;
    }
}

export default homesReducer;