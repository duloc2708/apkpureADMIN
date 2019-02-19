module.exports = [
    //american - 0
    function(betMoney, odds) {
        betMoney = new Decimal(betMoney || 0) //parseFloat(betMoney)
        odds = new Decimal(odds) //parseFloat(odds) //.toFixed(2)
        let result = 0
        if (odds < 0) {
            result = (odds.dividedBy(-100).times(betMoney)) //((odds / -100) * betMoney) //.toFixed(2)
        } else {
            result = betMoney
        }
        return result
    },
    //malaysia - 1
    function(betMoney, odds, side) {
        betMoney = new Decimal(betMoney || 0)
        odds = new Decimal(odds)
        switch (side) {
            case 4:
            case 5:
            case 6:
            case 15:
            case 16:
            case 17:
                return betMoney
                break
            default:
                if (odds > 0)
                    return betMoney
                else {
                    return new Decimal(betMoney).times(odds).times(-1) //((betMoney * odds) * -1) //.toFixed(2)
                }
                break
        }
    },
    //decimal - 2
    function(betMoney, odds) {
        betMoney = new Decimal(betMoney || 0)
        return betMoney
    },
    //indo - 3
    function(betMoney, odds) {
        betMoney = new Decimal(betMoney || 0)
        odds = new Decimal(odds)
        if (odds > 0) {
            return betMoney
        }
        return odds.times(-1).times(betMoney) //parseFloat((-odds * betMoney).toPrecision(12))
    },
    function(betMoney, odds) { //4-hk
        betMoney = new Decimal(betMoney || 0)
        return betMoney
    }
]