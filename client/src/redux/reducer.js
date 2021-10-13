import {LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER, REGISTER_FAIL, REGISTER_SUCCESS } from "./actionTypes";

const init = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    errors: null,
}

const reducer = (state= init, {type, payload}) => {
    switch (type) {
        case REGISTER:
        case LOGIN:
            return{
                ...state, 
                loading: true
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return{
                ...state,
                loading: false,
                errors: payload,
                    }
        case REGISTER_SUCCESS:
            return{
                ...state,
                loading: false,
                errors: null,
                user: payload,
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                user: payload,
                loading: false,
                errors: null,
                token: payload,
            }
        default:
            return state;
    }
}


export default reducer;