import AppState from 'react-app-state';
import { AuthStore } from './index';

export default new AppState({
    renderFirstNoteAlert: AuthStore.get('user') && !AuthStore.get('user').previous_login
});
