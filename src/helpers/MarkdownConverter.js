import Showdown from 'showdown';

export default new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    encodeEmails: true,
    openLinksInNewWindow: true,
    emoji: true
});
