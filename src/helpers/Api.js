import axios from 'axios';
import AuthStore from '../stores/Auth';
import history from './History';

class Api {
    constructor() {
        let service = axios.create({
            baseURL: 'https://api.calepin.io/api/v1/notes'
        });

        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    beforeRequest() {
        this.service.defaults.headers.common['Authorization'] = AuthStore.get('access_token')
            ? `Bearer ${AuthStore.get('access_token')}`
            : undefined;
    }

    handleSuccess(response) {
        return response;
    }

    handleError = error => {
        switch (error.response.status) {
            case 401:
                //history.push('/auth/login');
                break;
            case 404:
                history.push('/404');
                break;
            case 422:
                window.alert(Object.values(error.response.data.errors).join('\r\n'));
                break;
            default:
                history.push('/500');
                break;
        }
        return Promise.reject(error);
    };

    get(path, config) {
        this.beforeRequest();
        return this.service.get(path, config);
    }

    post(path, payload) {
        this.beforeRequest();
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        });
    }

    put(path, payload) {
        this.beforeRequest();
        return this.service.request({
            method: 'PUT',
            url: path,
            responseType: 'json',
            data: payload
        });
    }
}

export default new Api();
