const _getCookie = (cname) => {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            if (c.substring(name.length, c.length) && c.substring(name.length, c.length) != 'null') {
                return decodeURIComponent(c.substring(name.length, c.length))
            }
        }
    }
    return null
}
module.exports = _getCookie