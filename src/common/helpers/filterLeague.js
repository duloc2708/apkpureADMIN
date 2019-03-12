export default (odds) => {
    let leaguesFilter = Helper._getCookie('leagueSel')
    if ((Helper._getCookie('leagueSel') == null) || (odds.size < 1)) return odds
    leaguesFilter = Immutable.fromJS(JSON.parse(Helper._getCookie('leagueSel')))
    let oddsTemp = Immutable.fromJS([])
    odds.map((league) => {
        if (leaguesFilter &&
            leaguesFilter.indexOf(league.get('Id')) != -1) {
            oddsTemp = oddsTemp.push(Immutable.fromJS(league))
        }
    })
    return oddsTemp
}