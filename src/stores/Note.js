import AppState from 'react-app-state';
import merge from 'deepmerge';
import Api from '../helpers/Api';
import AuthStore from './Auth';
import Showdown from 'showdown';
import CryptoJS from 'crypto-js';

export const EmptyNote = {
    id: null,
    title: '',
    content: '',
    author_id: null,
    language: null,
    encrypted: false,
    public: false
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
                note: null,
                encryptionKey: ''
            },

            viewer: {
                note: null
            },

            notes: []
        });
    }

    mergeSet(propsAndValues, callback) {
        this.set(merge(this._propsAndValues, propsAndValues), callback);
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

        let noteToSubmit = this.get('editor').note;

        // Encrypt
        if (noteToSubmit.encrypted) {
            const encryptionKey = AuthStore.get('encryption_key');

            if (!encryptionKey) {
                alert("You're trying to add a encrypted note without an encryption key. Abording.");
                return;
            }

            noteToSubmit.content = CryptoJS.AES.encrypt(
                noteToSubmit.content,
                encryptionKey
            ).toString();
        }

        Api.post(`notes`, noteToSubmit)
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

    newNote = () => {
        this.set(
            merge(this._propsAndValues, {
                mode: 'editor',
                editor: {
                    originalNote: merge(EmptyNote, {
                        author_id: AuthStore.get('user').id
                    }),
                    note: merge(EmptyNote, {
                        author_id: AuthStore.get('user').id
                    })
                }
            })
        );
    };
}();
