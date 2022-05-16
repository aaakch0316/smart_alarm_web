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

class TokenService {
    constructor() {}
    static get() {
        if (typeof window !== "undefined") {
            return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
        }
    }

    static set(token) {
        if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY_NAME, token);
        }
    }

    static remove() {
        if (typeof window !== "undefined") {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY_NAME);
        }
    }
}

export default TokenService;