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

const defaultState = {
    mode: 'markdown',
    loading: false,
    mdeState: {
        draftEditorState: null,
        html: '',
        markdown: ''
    },
    originalNote: EmptyNote,
    note: EmptyNote
};

export default new class extends AppState {
    constructor() {
        super(defaultState);
    }

    new = () =>
        this.set({
            originalNote: {
                ...EmptyNote,
                author_id: AuthStore.get('user').id
            },
            note: {
                ...EmptyNote,
                author_id: AuthStore.get('user').id
            }
        });

    reset = () => this.set(defaultState);
}();
