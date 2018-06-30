import AppState from 'react-app-state';
import merge from 'deepmerge';
import Api from '../helpers/Api';
import AuthStore from './Auth';
import Showdown from 'showdown';

export const EmptyNote = {
    id: null,
    title: '',
    content: '',
    author_id: null,
    language: null
};

export default new class extends AppState {
    markdownConverter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
        encodeEmails: true,
        openLinksInNewWindow: true,
        emoji: true
    });

    constructor() {
        super({
            last_fetch: null,
            loading: false,
            mode: 'viewer',

            editor: {
                mode: 'markdown',
                mdeState: null,
                originalNote: null,
                note: null
            },

            viewer: {
                note: null
            },

            notes: []
        });
    }

    fetchAll() {
        this.set({
            notes: [],
            loading: true
        });

        Api.get('notes', {
            params: {
                author_id: AuthStore.get('user').id,
                sort: 'updated_at,desc'
            }
        }).then(({ status, data }) => {
            this.set({
                notes: data.data,
                loading: false
            });
        });
    }

    add() {
        this.set({ loading: true });
        Api.post(`notes`, this.get('editor').note)
            .then(({ status, data }) => {
                this.set(
                    merge(this._propsAndValues, {
                        editor: {
                            originalNote: data.data,
                            note: data.data
                        },
                        loading: false
                    })
                );
                this.fetchAll();
            })
            .catch(() => {
                this.set({ loading: false });
            });
    }

    update() {
        this.set({ loading: true });
        Api.put(`notes/${this.get('editor').note.id}`, this.get('editor').note)
            .then(({ status, data }) => {
                this.set(
                    merge(this._propsAndValues, {
                        editor: {
                            originalNote: data.data,
                            note: data.data
                        },
                        loading: false
                    })
                );
                this.fetchAll();
            })
            .catch(() => {
                this.set({ loading: false });
            });
    }
}();
