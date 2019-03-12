const _mapMarketToPer = (market, col, modeType = 1) => {
    if(modeType == 2 && col == 5) {
        return 1;
    }
    switch (true) {
        case ([10, 11, 12].indexOf(col) >= 0 && [0, 1, 2, 7, 99].indexOf(parseInt(market)) >= 0):
            return 1
        case ([4, 5, 6].indexOf(col) >= 0 && market == 3):
            return 1
        case ([7, 8, 9].indexOf(col) >= 0 && market == 3):
            return 0
        case ([1, 2, 3].indexOf(col) >= 0 && market == 9):
            return 11
        case ([1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(col) >= 0 && market == 8):
            return 12
        case ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].indexOf(col) >= 0 && market == 6):
            return 0
        default:
            return null
    }
}
module.exports = _mapMarketToPer