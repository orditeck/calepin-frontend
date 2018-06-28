import axios from 'axios';
import AuthStore from '../stores/Auth';
import history from './History'

class Api {
    constructor() {
        let service = axios.create({
            baseURL: 'https://api.calepin.test/api/v1'
        });

        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    beforeRequest() {
        this.service.defaults.headers.common['Authorization'] = AuthStore.get('access_token') ? `Bearer ${AuthStore.get('access_token')}` : undefined;
    };

    handleSuccess(response) {
        return response;
    }

    handleError = (error) => {

        switch (error.response.status) {
            case 401:
                //history.push('/auth/login');
                break;
            case 404:
                history.push('/404');
                break;
            default:
                history.push('/500');
                break;
        }
        return Promise.reject(error)
    };

    get(path, config, callback) {
        this.beforeRequest();
        return this.service.get(path, config).then(
            (response) => callback(response.status, response.data)
        );
    }

    patch(path, payload, callback) {
        this.beforeRequest();
        return this.service.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => callback(response.status, response.data));
    }

    post(path, payload, callback) {
        this.beforeRequest();
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload
        }).then((response) => callback(response.status, response.data));
    }
}

export default new Api();