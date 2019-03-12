export default (num) => {
    if (num && !_.isNaN(num)) {
        let p = (num.toString()).split(".")
        return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc
        }, "") + "." + (p[1] && p[1].length > 1 ? p[1].substring(0, 2) : p[1] && p[1].length == 1 ? p[1] + '0' : '00')
    }
    return '0.00'
}