import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
    user: {},
    validToken: false,
};

const isActionPayload = (payload) => {
    return payload ? true : false;
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
            return{
                ...state,
                validToken: isActionPayload(action.payload),
                user: action.payload
            };
    
        default:
           return state;
    }
}

