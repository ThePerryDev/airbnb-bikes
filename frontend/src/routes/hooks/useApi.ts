import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/validate', { token });
        console.log("validateToken", response);
        return response.data;
    },
    signin: async (email: string, jtiToken: string) => {
        /**PAREI AQUI */
        // let user = await api.get()
        const response = await api.post('/signin', { email });
        console.log("signin", response);
        return response.data;

    },
    logout: async () => {
        const response = await api.post('/logout');
        console.log("logout", response);
        return response.data;
    }
});