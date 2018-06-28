import AppState from 'react-app-state';
import Api from '../helpers/Api';
import AuthStore from './Auth';

export default new class extends AppState {
    constructor() {
        super({
            last_fetch: null,
            notes: {

            },
            note: {
                mode: 'edit',
                id: null,
                title: null,
                content: null,
            }
        });
    }

    fetch() {
        Api.get('notes', {
            params: {
                author_id: AuthStore.get('user').id
            }
        }, () => {

        });
    }
}();