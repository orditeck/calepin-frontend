import AppState from 'react-app-state';

export let DefaultState = {
    logged_in: false,
    access_token: null,
    encryption_key: '',

    user: {
        id: null,
        email: null,
        first_name: null,
        last_name: null,
        previous_login: null
    }
};

export default new class extends AppState {
    constructor() {
        super(JSON.parse(sessionStorage.getItem('AuthStore')) || DefaultState);
    }

    set(data) {
        super.set(data);
        sessionStorage.setItem('AuthStore', JSON.stringify(this._propsAndValues));
    }
}();
