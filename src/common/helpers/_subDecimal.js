export default (num, n = 2) => {
    if (!_.isUndefined(num) &&
        !_.isNull(num)) {
        if (num.toString().indexOf('.') != -1) {
            let inte = num.toString().substr(0, num.toString().indexOf('.'))
            let deci = num.toString().substr(num.toString().indexOf('.') + 1, n)
            return inte + '.' + deci
        } else {
            return num
        }
    } else {
        return num
    }
    return num
}