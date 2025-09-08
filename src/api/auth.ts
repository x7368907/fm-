import instance from "./axios";

export const login = async (email: string, password: string) => {
    const response = await instance.post('/login', { email, password });
    return response.data;
}

export const logout = async () => {
    const response = await instance.post('/logout');
    return response.data;
}