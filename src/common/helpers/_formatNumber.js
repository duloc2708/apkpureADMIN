const _formatNumber = (num) => {
    if (num && !_.isNaN(num)) {
        let p = (num.toString()).split(".")
        return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc
        }, "")
    }
    return ''
}
module.exports = _formatNumber