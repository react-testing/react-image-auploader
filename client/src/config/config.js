export const host = "http://201.211.93.91:5000/";
export const api = host + "api/";
export const image = "/images";
export const login = "/auth/login";
export const upload = "/images/upload";
export const token = "/auth/verify-token";
export const userInfo = "/user/user";
export const perfilPhoto = "/user/perfil-photo";
export const comments = "/comment";
export const deleteComment = (id) => `${comments}/${id}`;
export const editComment = (id) => `${comments}/${id}`;
