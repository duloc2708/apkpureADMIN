module.exports = [
    //american - 0
    function(risk, odds) {
        risk = new Decimal(risk || 0)
        odds = new Decimal(odds)
        let result = 0
        if (odds < 0) {
            result = (risk.dividedBy(odds).times(100)).times(-1)
        } else {
            result = risk
        }
        return result
    },
    //malaysia - 1
    function(risk, odds, side) {
        risk = new Decimal(risk || 0)
        odds = new Decimal(odds)
        switch (true) {
            case _.indexOf(Helper._getSideEU(), side) != -1:
                return risk
                break
            default:
                if (odds > 0)
                    return risk
                else {
                    return new Decimal(risk).dividedBy(odds).times(-1)
                }
                break
        }
    },
    //decimal - 2
    function(risk) {
        risk = new Decimal(risk || 0)
        return risk
    },
    //indo - 3
    function(risk, odds) {
        risk = new Decimal(risk || 0)
        odds = new Decimal(odds)
        if (odds > 0) {
            return risk
        }
        return risk.dividedBy(odds).times(-1)
    },
    function(risk, odds) { //4-hk
        risk = new Decimal(risk || 0)
        return risk
    }
]