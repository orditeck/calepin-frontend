import Api from '../helpers/Api';
import { AuthStore } from '../stores';
import CryptoJS from 'crypto-js';

export default new class {
    get() {
        return Api.get('notes', {
            params: {
                author_id: AuthStore.get('user').id,
                sort: 'updated_at,desc'
            }
        });
    }

    find(uuid) {
        return Api.get(`notes/${uuid}`);
    }

    save(note) {
        const url = note.id ? `notes/${note.id}` : `notes`;
        const method = note.id ? 'put' : 'post';
        return Api[method](url, this.encryptNote(note));
    }

    delete(uuid) {
        return Api.delete(`notes/${uuid}`);
    }

    encryptNote = note => {
        // Encrypt if needed
        if (note.encrypted) {
            const encryptionKey = AuthStore.get('encryption_key');

            if (!encryptionKey) {
                alert(
                    "You're trying to submit an encrypted note without an encryption key. Please set your encryption key in the app settings first then save your note."
                );
                return;
            }

            note.content = CryptoJS.AES.encrypt(note.content, encryptionKey).toString();
        }

        return note;
    };
}();
