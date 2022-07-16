export class GlobalHelpers {
    static readonly COOKIENAME: string = "movie-site";
    static readonly EMAIL_REGEXP = /^(\?("")("".+?(?:!\\)""@)|(([0-9a-zA-Z]((\.(?!\.))|[-!#\$%&'\*\+\/=\?\^`\{\}\|~\w])*)(?:[0-9a-zA-Z])@))(\?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-zA-Z][-0-9a-zA-Z]*[0-9a-zA-Z]*\.)+[a-zA-Z0-9][\-a-zA-Z0-9]{0,22}[a-zA-Z0-9]))$/;
}