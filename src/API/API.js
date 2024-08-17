import axios from "axios";
import { interceptorsRequest, interceptorsRequestError, interceptorsResponse, interceptorsResponseError } from "./interceptors";

let API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
});

API.defaults.headers.post["content-type"] = "application/json";

API.defaults.headers.get["Accept"] = "application/json";

API.interceptors.request.use(
    (request) => {
        const interceptorsReq = interceptorsRequest(request);
        return interceptorsReq;
    },

    (error) => {
        const promiseError = interceptorsRequestError(error);
        throw promiseError;
    }
);

API.interceptors.response.use(
    (response) => {
        const interceptorsRes = interceptorsResponse(response);
        return interceptorsRes;
    },

    (error) => {
        const responseError = interceptorsResponseError(error);
        throw responseError;
    }
);

export default API;
