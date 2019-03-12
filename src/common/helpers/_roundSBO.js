export default (num, n) => {
    if (num) {
        // return Math.round(num * 100) / 100
        var temp = num.toString()
        if (temp.indexOf('.') != -1) {
            var indexDot = temp.indexOf('.');
            var sub = temp.substr(indexDot + 1, temp.length);
            if (sub[2] >= 5) {
                var compareString = new Decimal(`0.${sub.substr(0, 2)}`).plus(0.01);
                compareString = compareString.plus(temp.substr(0, indexDot))
                return compareString.toNumber();
            } else {
                var compareString = parseFloat(`${temp.substr(0, indexDot)}.${sub.substr(0, 2)}`);
                return compareString;
            }
        }
    } else {
        return num
    }
    return num
}