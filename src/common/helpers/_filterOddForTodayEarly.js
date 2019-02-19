export default (data) => {
    data = data.update(leagues => {
        leagues = leagues.map(league => {
            let Matches = league.get('Matches').filter(match => {
                let isGetMoneyLineOrOU = false;
                match.get('Periods').map(period => {
                    if(typeof period === 'object') {
                        let indexPeriod = period.findIndex(p => {
                            return typeof p === 'object' && [0, 2].indexOf(p.get('0')) != -1
                        })
                        if(indexPeriod != -1)
                            isGetMoneyLineOrOU = true;
                    }
                });
                if(isGetMoneyLineOrOU) {
                    return isGetMoneyLineOrOU;
                }
            })
            league = league.set('Matches', Matches)
            if(Matches.size > 0)
                return league;
        })
        return leagues;
    })
    data = data.filter(iD => iD !== undefined)
    return data;
}