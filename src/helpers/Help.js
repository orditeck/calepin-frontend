import { AuthStore, ViewerStore, HelpStore } from '../stores';

export const checkIfShouldRenderFirstNoteEncryptionNotice = function() {
    if (_checkIfShouldRenderFirstNoteEncryptionNotice === true) {
        HelpStore.set({
            renderFirstNoteAlert: true
        });
    }
};

function _checkIfShouldRenderFirstNoteEncryptionNotice() {
    if (HelpStore.get('renderFirstNoteAlert') !== false) {
        return false;
    }

    if (AuthStore.get('user') && !AuthStore.get('user').previous_login) {
        console.log(AuthStore.get('user').previous_login);
        return true;
    }

    if (!ViewerStore.get('notes').length) {
        console.log(ViewerStore.get('notes').length);
        return true;
    }

    return false;
}
