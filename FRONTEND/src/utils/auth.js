import Cookies from 'js-cookie';

export const getAccessToken = () => {
    return Cookies.get('access_token');
};

export const isAuthenticated = () => {
    return !!getAccessToken();
};
