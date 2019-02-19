const _setCookie = (key, value, timeSet) => {
    let timeDefault = (1000 * 60 * 24 * 30 * 365)
    let timeEp = timeSet ? timeSet : timeDefault
    let expires = new Date()
    expires.setTime(expires.getTime() + timeEp)
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/'
}
module.exports = _setCookie