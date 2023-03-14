import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000"

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("accessToken")
    config.headers.Authorization = `Bearer ${token}`
    config.headers.get['Content-Type'] = 'application/json';
    return config;

}, function (error) {
    return Promise.reject(error);
});
