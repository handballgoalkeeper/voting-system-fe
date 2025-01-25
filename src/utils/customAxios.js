import axios from "axios";

const customAxios = axios.create({
    // TODO: Move it to .env ...
    baseURL: 'http://127.0.0.1:8000/api/v1.0',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default customAxios;