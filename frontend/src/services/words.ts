import api from "./api";

export async function fetchWords() {
    const res = await api.get("/text");
    console.log(res.data);
    return res.data;
}
