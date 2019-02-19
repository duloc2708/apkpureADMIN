const _getColForMarket = (mode, market) => {
    return {
        1: { //single view
            0: 12,
            1: 12,
            2: 12,
            3: 9,
            4: 1,
            5: 6,
            6: 16,
            7: 12,
            8: 9,
            9: 3,
            99: 12
        },
        2: {
            0: 12,
            1: 12,
            2: 12,
            3: 9,
            4: 1,
            5: 6,
            6: 16,
            7: 12,
            8: 9,
            9: 3,
            99:12
        }

    }[mode][market]
}
module.exports = _getColForMarket