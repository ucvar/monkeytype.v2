import api from "./api";

export async function registerUser(data: { email: string; password: string }) {
    const res = await api.post("/auth/register", data);
    return res.data;
}

export async function loginUser(data: { email: string; password: string }) {
    const res = await api.post("/auth/login", data);
    const { access_token } = res.data;
    localStorage.setItem("access_token", access_token);
    return res.data;
}
