import axios from 'axios';
import { AuthStore, SettingsStore } from '../stores';
import history from './History';

class Api {
    constructor() {
        let service = axios.create();
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    beforeRequest() {
        this.service.defaults.baseURL = SettingsStore.get('api_url');
        this.service.defaults.headers.common['Authorization'] = AuthStore.get('access_token')
            ? `Bearer ${AuthStore.get('access_token')}`
            : undefined;
    }

    handleSuccess(response) {
        return response;
    }

    handleError = error => {
        if (error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    history.push('/auth/login');
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
        } else {
            history.push('/500');
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

    delete(path, config) {
        this.beforeRequest();
        return this.service.delete(path, config);
    }
}

export default new Api();
