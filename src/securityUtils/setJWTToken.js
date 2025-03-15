import axios from "axios";

const setJWTToken = token => {
    if(token){
        axios.defaults.headers.common["Authorization"] = token;
    }else {
        // keep things nice and clean
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setJWTToken;


