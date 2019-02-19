const _mapMarketToText = (market) => {
    return {
        0: 'FT',
        1: '1st Half',
        10: 'Outright',
        11: 'First Goal/Last Goal',
        13: 'FT Corners',
        14: '1st Half Corners',
        17: 'FT Bookings',
        18: '1st Half Bookings',
        15: 'First Corners/ Last Corners'
    } [market]
}
module.exports = _mapMarketToText