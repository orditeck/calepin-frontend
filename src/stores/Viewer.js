import AppState from 'react-app-state';

export default new class extends AppState {
    constructor() {
        super({
            loading: false,
            note: null,
            notes: []
        });
    }
}();
