const _mapStatusToClass = (status) => {
    switch (status) {
        case 0:
            return 'status rejected'
        case 1:
            return 'status running'
        case 2:
            return 'status pending'
        default:
            return 'status rejected'
    }
}
module.exports = _mapStatusToClass