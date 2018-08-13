import AppState from 'react-app-state';

export let DefaultState = {
    encryption_key: '',
    api_url: 'https://api.calepin.io/api/v1',
    mdeLayout: 'tabbed'
};

export default new class extends AppState {
    constructor() {
        super(JSON.parse(sessionStorage.getItem('SettingsStore')) || DefaultState);
    }

    set(data) {
        super.set(data);
        sessionStorage.setItem('SettingsStore', JSON.stringify(this._propsAndValues));
    }
}();
