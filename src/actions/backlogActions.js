import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from "./types";

export const addProjectTask = (
    backlog_id, 
    project_task, 
    navigate
) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlog_id}`, project_task);
        navigate(`/projectBoard/${backlog_id}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getBacklog = backlog_id => async dispatch => {
    try{
        const res = await axios.get(`/api/backlog/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });
    } catch(err){
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getProjectTask = (
    backlog_id, 
    pt_id, 
    navigate
) => async dispatch => {
    try{
        const res = await axios.get(`/api/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }catch(err){
        navigate("/dashboard");
    }
};

export const updateProjectTask = (
    backlog_id, 
    pt_id, 
    project_task, 
    navigate,
) => async dispatch => {
    try{
        await axios.patch(`/api/backlog/${backlog_id}/${pt_id}`, project_task);
        navigate(`/projectBoard/${backlog_id}`);
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

export const deleteProjectTask = (
    backlog_id, 
    pt_id, 
) => async dispatch => {
    if(
        window.confirm(
            `You are deleting project task ${pt_id}, this action cannot be undone`
        )
    ){
        await axios.delete(`/api/backlog/${backlog_id}/${pt_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        });
    }
};




