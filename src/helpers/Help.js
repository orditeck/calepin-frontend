import { AuthStore, HelpStore } from '../stores';

export const checkIfShouldRenderFirstNoteEncryptionNotice = function() {
    if (_checkIfShouldRenderFirstNoteEncryptionNotice() === true) {
        HelpStore.set({
            renderFirstNoteAlert: true
        });
    }
};

function _checkIfShouldRenderFirstNoteEncryptionNotice() {
    if (HelpStore.get('renderFirstNoteAlert') !== false) {
        // Default is false, if it's not false, then it's true or something else.
        // But when it's true, we don't come here. So it's something else than true,
        // like 'do-not-ask-again'. So no, we should not render the notice
        return false;
    }

    if (AuthStore.get('user') && !AuthStore.get('user').previous_login) {
        return true;
    }

    return false;
}
