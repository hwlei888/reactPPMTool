import axios from "axios";
import { GET_ERRORS, GET_PROJECT, GET_PROJECTS, DELETE_PROJECT } from "./types";



export const createProject = (project, navigate) => async dispatch => {
    try{
        await axios.post("/api/project", project);
        // history.push("/dashboard"); //not work now, need to use navigate
        // console.log('hwl res', res);
        navigate('/dashboard');
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch(err){
        // console.log('hwl err', err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    };
};

export const getProjects = () => async dispatch => {
    const res = await axios.get("/api/project/all");
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    })
};

export const getProject = (id, navigate) => async dispatch => {
    try{
        const res = await axios.get(`/api/project/${id}`);
        navigate(`/updateProject/${id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        })
    } catch(error){
        navigate('/dashboard');
    }
};

export const deleteProject = (id, navigate) => async dispatch => {
    if(
        window.confirm(
            "Are you sure? This will delete the project and all the data related to it"
        )
    ){
        await axios.delete(`/api/project/${id}`);
        dispatch({
            type: DELETE_PROJECT,
            payload: id
        });
    }
};




