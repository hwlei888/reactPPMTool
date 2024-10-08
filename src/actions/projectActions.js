import axios from "axios";
import { GET_ERRORS, GET_PROJECTS } from "./types";



export const createProject = (project, history, navigate) => async dispatch => {

    try{
        const res = await axios.post("http://localhost:8080/api/project", project);
        console.log('hwl res', res);
        navigate('/dashboard');
    } catch(err){
        console.log('hwl err', err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    };
};

export const getProjects = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/api/project/all");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    })
}




