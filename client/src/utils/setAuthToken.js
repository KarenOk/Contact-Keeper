import Axios from "axios";

const setAuthToken = token => {
    if (token)
        Axios.defaults.headers.common['x-api-key'] = token;
    else
        delete Axios.defaults.headers.common['x-api-key'];
};

export default setAuthToken;