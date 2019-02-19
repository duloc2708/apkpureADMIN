module.exports = [
    //american - 0
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds) //.toFixed(2)
        let result = 0
        if (odds < 0) {
            result = ((new Decimal(odds).dividedBy(-100)).times(betMoney)).plus(betMoney) //(odds / -100) * betMoney + betMoney
        } else {
            result = ((new Decimal(odds / 100)).times(betMoney)).plus(betMoney) //(odds / 100) * betMoney + betMoney
        }
        return result
    },
    //malaysia - 1
    function(betMoney, odds, side) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds)
        switch (true) {
            case _.indexOf(Helper._getSideEU(), side) != -1:
                return new Decimal(betMoney).times(odds) //(betMoney * odds)
                break
            default:
                if (odds > 0)
                    return (new Decimal(betMoney).times(odds)).plus(betMoney) //((betMoney * odds) + betMoney)
                return (new Decimal(betMoney).times(odds).times(-1)).plus(betMoney) //((betMoney * odds) * -1 + betMoney)
                break
        }
    },
    //decimal - 2
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney || 0)
        odds = parseFloat(odds)
        let result = new Decimal(betMoney).times(odds) //parseFloat((betMoney * odds).toPrecision(12))
        return result
    },
    //indo - 3
    function(betMoney, odds, side) {
        betMoney = new Decimal(betMoney || 0) //parseFloat((betMoney))
        odds = new Decimal(odds) //parseFloat((odds))
        switch (true) {
            case _.indexOf(Helper._getSideEU(), side) != -1:
                //betMoney = new Decimal(betMoney)//parseFloat((betMoney).toPrecision(12))
                //odds = new Decimal(odds) //parseFloat((odds).toPrecision(12))
                // return (betMoney * odds)
                return betMoney.times(odds) //parseFloat((betMoney * odds).toPrecision(12))
                break;

            case 17:
                return betMoney.times(odds) //parseFloat((betMoney * odds).toPrecision(12))
                break
            default:
                if (odds > 0) {
                    return (betMoney.times(odds)).plus(betMoney)
                } else {
                    return (betMoney.times(odds.times(-1))).plus(betMoney)
                }
        }
    },
    function(betMoney, odds, side) { //4-hk
        betMoney = new Decimal(betMoney || 0) //parseFloat((betMoney))
        odds = new Decimal(odds) //parseFloat((odds))
        switch (true) {
            case _.indexOf(Helper._getSideEU(), side) != -1:
                return betMoney.times(odds) //parseFloat((betMoney * odds).toPrecision(12))
                break;
            case 17:
                return betMoney.times(odds) //parseFloat((betMoney * odds).toPrecision(12))
                break
            default:
                return (betMoney.times(odds)).plus(betMoney)
        }
    }
]