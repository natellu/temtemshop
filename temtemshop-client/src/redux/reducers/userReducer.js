import {LOGIN, SET_USER, SET_DISCORD} from '../types'

const initialState = {
    user: '',
    loading: false,
    errors: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                loading: true
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_DISCORD:
            return {
                ...state,
                discord: action.payload
            }
        default:
            return state
            
    }
}

export default userReducer