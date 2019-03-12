export default (odds) => {
    function _subDecimal(num, n = 2) {
        if (!_.isUndefined(num) &&
            !_.isNull(num)) {
            num = new Decimal(num)
            if (num.toString().indexOf('.') != -1) {
                let inte = num.toString().substr(0, num.toString().indexOf('.'))
                let deci = num.toString().substr(num.toString().indexOf('.') + 1, n)
                if (deci != '00') {
                    return inte + '.' + deci
                } else {
                    return inte
                }

            } else {
                return num
            }
        } else {
            return num
        }
        return num
    }
    let finalOdds = null,
        oriOdds = null,
        subOdds = null
    if (odds) {
        oriOdds = odds
        let lenghStart = 0
        let lenghEnd = 0
        if (oriOdds.toString().indexOf('.') != -1) {
            lenghStart = oriOdds.toString().substring(0, oriOdds.toString().indexOf('.') + 1).length
            lenghEnd = oriOdds.toString().substring(oriOdds.toString().indexOf('.') + 1, oriOdds.toString().indexOf('.') + 3).length
            subOdds = (new Decimal(oriOdds).toString()).substring(0, lenghStart + lenghEnd)
        } else {
            subOdds = oriOdds
        }
        if (oriOdds == subOdds) {
            finalOdds = _subDecimal(oriOdds.toString(), 2)
        } else {
            if (!oriOdds.isPositive()) { //<0
                finalOdds = _subDecimal(new Decimal(oriOdds).minus(0.01).toString(), 2)
            } else {
                finalOdds = _subDecimal(oriOdds.toString(), 2)
            }
        }
    }
    return finalOdds.toString()
}