const _mapOddsTypeToText = (type)=> {
    return {
        0: 'A',
        1: 'M',
        2: 'E',
        3: 'I',
        4: 'H'
    } [type]
}
module.exports = _mapOddsTypeToText