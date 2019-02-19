const _mapSportIDToName = (id) => {
    return {
        29: 'Soccer',
        4: 'Basketball',
        33: 'Tennis',
        12: 'E Sports',
        3: 'Baseball',
        15: 'Football',
        34: 'Volleyball',
        1: 'Badminton'
    } [parseInt(id)]
}
module.exports = _mapSportIDToName