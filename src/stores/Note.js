import AppState from 'react-app-state';
import Api from '../helpers/Api';
import AuthStore from './Auth';

export const EmptyNote = {
    id: null,
    title: null,
    content: null,
};

export default new class extends AppState {
    constructor() {
        super({
            last_fetch: null,
            loading: false,
            mode: 'view',
            editor_mode: 'text',

            notes: [],

            note: EmptyNote
        });
    }

    fetch(callback) {
        Api.get('notes', {
            params: {
                author_id: AuthStore.get('user').id
            }
        }, () => {
            if(typeof callback === 'function'){
                callback();
            }
        });
    }
}();