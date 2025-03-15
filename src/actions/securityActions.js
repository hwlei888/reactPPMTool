import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken"
import { jwtDecode } from "jwt-decode";

export const createNewUser = (newUser, navigate) => async dispatch => {
    try{
        await axios.post("api/users/register", newUser);
        navigate("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const login = LoginRequest => async dispatch => {
    try {
        // post => login request
        const res = await axios.post("/api/users/login", LoginRequest);
        // extract token from res.data
        const { token } = res.data;
        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        // set our token in header
        setJWTToken(token);
        // decode token on React
        const decoded = jwtDecode(token);
        // dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
        
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}


