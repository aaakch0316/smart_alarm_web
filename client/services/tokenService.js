const LOCAL_STORAGE_TOKEN_KEY_NAME="token"

export const getToken = () => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
}

export const setToken = (token) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME,token);
}

export const removeToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
}
