const _getColSpan = ({ market, mode }) => {
    market = parseInt(market)
    mode = parseInt(mode)
    const sportHeaders = Helper._getHeaderForMarket(market, mode)
    let totalCol = 0
    if (sportHeaders &&
        sportHeaders[0]) {
        for (let key in sportHeaders[0]) {
            if (sportHeaders[0][key]) {
                totalCol += (sportHeaders[0][key].colSpan != '' &&
                    !isNaN(sportHeaders[0][key].colSpan)) ? parseInt(sportHeaders[0][key].colSpan) : 1
            }
        }
    }
    return totalCol
}
module.exports = _getColSpan