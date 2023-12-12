import { jwtDecode } from "jwt-decode";

export const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

export const getCookies = () => {
    const cookiesString = document.cookie;
    const cookiesArray = cookiesString.split('; ');

    const cookies = {};
    for (const cookie of cookiesArray) {
        const [name, value] = cookie.split('=');
        cookies[name] = value;
    }
    return cookies;
}

export const decodeToken = (token) => {
    const decodeToken = jwtDecode(token);
    return decodeToken;
}

export const getLocations = async (page = 1, pageSize = 20) => {
    await fetch(`${process.env.REACT_APP_BASE_URL}/general/locations?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log(err);
        })
}