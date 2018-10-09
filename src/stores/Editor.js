import AppState from 'react-app-state';
import { AuthStore } from './';

export const EmptyNote = {
    id: null,
    title: '',
    content: '',
    author_id: null,
    language: null,
    encrypted: false,
    public: false
};

export const DefaultState = {
    type: 'new',
    mode: 'markdown',
    loading: false,
    mdeState: {
        markdown: ''
    },
    originalNote: EmptyNote,
    note: EmptyNote
};

export default new class extends AppState {
    constructor() {
        super(DefaultState);
    }

    new = () =>
        this.set({
            type: 'new',
            originalNote: {
                ...EmptyNote,
                author_id: AuthStore.get('user').id
            },
            note: {
                ...EmptyNote,
                author_id: AuthStore.get('user').id
            }
        });

    reset = () => this.set(DefaultState);
}();
