import { getToken } from './localStorage';

export const getRequest = async (url: string, headers: object = {}) => {
    const token = getToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            ...headers,
        },
    });

    const result = await response.json();
    return result;
};

export const deleteRequest = async (url: string, data: object = {}, headers: object = {}) => {
    const token = getToken();
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
};