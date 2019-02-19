const _countEvent = ({ market, listToday, listLive, listEarly, eventCountData, sportID }) => {
    function countEvent({ market, listLive, listToday, listEarly }) {
        let maxLengthList = 0
        let listMap = {}
        const objLength = {
            0: 0,
            1: 0,
            2: 0
        }
        switch (market) {
            case 0:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1, 0].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').map((match, iM) => {
                            if (match.getIn(['Periods', 0, 0]) == 0 ||
                                match.getIn(['Periods', 1, 0]) == 1) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
            case 1:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').map((match, iM) => {
                            if (match.getIn(['Periods', 0, 0]) == 0 ||
                                match.getIn(['Periods', 1, 0]) == 1) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
            case 2:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [2].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').forEach((match, iM) => {
                            if (match.getIn(['Periods', 0, 0]) == 0 ||
                                match.getIn(['Periods', 1, 0]) == 1) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
            case 3:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1, 0, 2].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').forEach((match, iM) => {
                            if (match.getIn(['Periods', 0, 0]) == 0 ||
                                match.getIn(['Periods', 1, 0]) == 1) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
            case 4:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1, 0, 2].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        objLength[key]++
                    })
                })
                break
            case 5:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1, 0, 2].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').forEach((match, iM) => {
                            const objPer = _.find(match.get('Periods').toJS(), function(ft) { return (ft && ft[0] == 0) })
                            const objOETG = _.find(objPer, function(ft) { return (ft && (ft[0] == 8 || ft[0] == 11)) })
                            if (objOETG) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
            case 6:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1, 0, 2].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').forEach((match, iM) => {
                            const objPer = _.find(match.get('Periods').toJS(), function(ft) { return (ft && ft[0] == 0) })
                            const objFTFHCS = _.find(objPer, function(ft) { return (ft && (ft[0] == 18)) })
                            if (objFTFHCS) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
            case 7:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1, 0, 2].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').forEach((match, iM) => {
                            if (match.getIn(['Periods', 0, 0]) == 0 ||
                                match.getIn(['Periods', 1, 0]) == 1) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
            case 8:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1, 0, 2].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').forEach((match, iM) => {
                            const objHTFT = _.find(match.get('Periods').toJS(), function(ft) { return (ft && ft[0] == 12) })
                            if (objHTFT) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
            case 9:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1, 0, 2].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').forEach((match, iM) => {
                            const objPer = _.find(match.get('Periods').toJS(), function(ft) { return (ft && ft[0] == 11) })
                            const objFTFHCS = _.find(objPer, function(ft) { return (ft && (ft[0] == 44)) })
                            if (objFTFHCS) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
            default:
                listMap = { 1: listLive, 0: listToday, 2: listEarly };
                [1, 0, 2].map((key, iK) => {
                    listMap[key].map((league, iL) => {
                        league.get('Matches').forEach((match, iM) => {
                            if (match.getIn(['Periods', 0, 0]) == 0 ||
                                match.getIn(['Periods', 1, 0]) == 1) {
                                objLength[key]++
                            }
                        })
                    })
                })
                break
        }
        return objLength
    }
    switch (market) {
        case 0:
            //update for today
            const eventToday = countEvent({ market: 0, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][0] &&
                eventCountData[sportID][0]) {
                eventCountData[sportID][0][0] = eventToday[0]
                eventCountData[sportID][0][1] = eventToday[1]
            }
            break
        case 1:
            //update for live
            const eventLive = countEvent({ market: 1, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][0] &&
                eventCountData[sportID][0]) {
                eventCountData[sportID][0][1] = eventLive[1]
            }
            break
        case 2:
            //update for early
            const eventEarly = countEvent({ market: 2, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][0] &&
                eventCountData[sportID][0]) {
                eventCountData[sportID][0][2] = eventEarly[2]
            }
            break
        case 3:
            //update money line
            const eventMoneyLine = countEvent({ market: 3, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][4] &&
                eventCountData[sportID][4]) {
                eventCountData[sportID][4] = eventMoneyLine
            }
            break
        case 4:
            //update for outright
            const eventOutright = countEvent({ market: 4, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][2] &&
                eventCountData[sportID][2]) {
                eventCountData[sportID][2] = eventOutright
            }
            break
        case 5:
            //update for OETG
            const eventOETG = countEvent({ market: 5, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][3] &&
                eventCountData[sportID][3]) {
                eventCountData[sportID][3] = eventOETG
            }
            break
        case 6:
            //update for FTFHCS
            const eventFTFHCS = countEvent({ market: 6, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][5] &&
                eventCountData[sportID][5]) {
                eventCountData[sportID][5] = eventFTFHCS
            }
            break
        case 7:
            //update for parlay
            const eventParlay = countEvent({ market: 7, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][1] &&
                eventCountData[sportID][1]) {
                eventCountData[sportID][1] = eventParlay
            }
            break
        case 8:
            //update for HT FT
            const eventHTFT = countEvent({ market: 8, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][6] &&
                eventCountData[sportID][6]) {
                eventCountData[sportID][6] = eventHTFT
            }
            break
        case 9:
            //update for FG LG
            const eventFGLG = countEvent({ market: 9, listLive: listLive, listToday: listToday, listEarly: listEarly })
            if (eventCountData &&
                eventCountData[sportID] &&
                eventCountData[sportID][7] &&
                eventCountData[sportID][7]) {
                eventCountData[sportID][7] = eventFGLG
            }
            break
        default:
            break
    }
    return eventCountData
}
module.exports = _countEvent