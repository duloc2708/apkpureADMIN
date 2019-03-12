module.exports = [
    function () {
        let { pathname } = window.location
        return _.includes(`/${pathname}`, Routes.virtualSports.view) || false
    },
    function (isShow) {
        return _.includes(window.location.pathname, Routes.virtualSports.view) ? `${isShow ? `&` : `?`}isVirtualSport=true` : ``
    },
]