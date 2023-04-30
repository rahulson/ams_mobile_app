import React, { useReducer } from 'react'
import { STORE_USER_INFO  } from './User.Action'

const initialState = {
    auth: null
}


const userReducer = (state, action) => {
    switch (action.type) {
        case STORE_USER_INFO:
            return {
                ...state,
                auth: action.payload
            }
            break
        default:
            return state    
    }
}

export const getReducer = () => {
    return useReducer(userReducer, initialState);
};