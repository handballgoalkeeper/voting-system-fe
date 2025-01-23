import axios from "axios";

class CustomAxios {
    constructor() {
        this.axiosInstance = axios.create({
            // TODO: Move it to .env ...
            baseURL: 'https://dummyjson.com',
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    async get(url, config) {
        return await this.axiosInstance.get(url, config);
    }

    async post(url, body, config) {
        return await this.axiosInstance.post(url, body, config);
    }

    async put(url, body, config) {
        return await this.axiosInstance.put(url, body, config);
    }

    async patch(url, body, config) {
        return await this.axiosInstance.patch(url, body, config);
    }

    async delete(url, config) {
        return await this.axiosInstance.delete(url, config);
    }
}

const customAxios = new CustomAxios();

export default customAxios;