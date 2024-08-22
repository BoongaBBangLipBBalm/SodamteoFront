import { getToken } from './localStorage';

export const getRequest = async (url: string, headers: object = {}) => {
    const token = getToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '', // 이거 Bearer 2번 뜨던데 체크해주세용 ("Bearer Bearer 머시기")
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