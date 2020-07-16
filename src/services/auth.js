import Cookie from "js-cookie";

const isAuthenticed = () => {
    return Cookie.get("token") != null;
}

const setToken = (token) => {
    Cookie.set("token", token);
}

const getToken = () => {
    return Cookie.get("token") ? Cookie.get("token") : null;
}

const removeToken = () => {
    Cookie.remove("token");
}

export {
    isAuthenticed,
    setToken,
    getToken,
    removeToken
}