export default (iO, sport, favourite, listIdFA, data, isDisplay) => {
    let dataTemp = _.clone(data, true)
    // update favorite
    dataTemp = dataTemp.map(Matches => {
        let itemMatches = Matches.toJS()
        let leaguesId = itemMatches.Id
        // let statusLeagues = favourite.getIn([sport ? sport.toString() : '', iO, `${leaguesId || ''}_${moment(Matches.getIn(['Matches', 0, 'Start'])).format('YYYY_MM_DD_HH_mm_ss')}`, 'status'])
        itemMatches["isDisplayFa"] = isDisplay
        // update key match ID
        // check exists all leagues
        let statusAll = true
        itemMatches["Matches"].map(itemDetail => {
            let status = favourite.getIn([sport && sport.toString() || '', iO, `${leaguesId || ''}_${moment(itemDetail.Start).format('YYYY_MM_DD_HH_mm_ss')}`, itemDetail.Id && itemDetail.Id.toString()])
            itemDetail["InfoMatchFA"] = { "Id": itemDetail.Id, status: status || false }
            if (!status) {
                statusAll = false
            }
            return itemDetail
        })
        itemMatches["InfoLeaguesFA"] = { "Id": leaguesId, status: statusAll }

        return Immutable.fromJS(itemMatches)
    })
    return dataTemp
    // end update favourite
}