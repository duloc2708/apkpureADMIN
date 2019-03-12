module.exports =[
    //american - 0
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds)
        let result = 0
        if (odds < 0) {
            result = (new Decimal(odds).dividedBy(-100)).times(betMoney) //(odds / -100) * betMoney
        } else {
            result = (new Decimal(odds).dividedBy(100)).times(betMoney) //(odds / 100) * betMoney
        }
        return result
    },
    //malaysia - 1
    function(betMoney, odds) {
        betMoney = parseFloat(betMoney)
        odds = parseFloat(odds)
        let result = 0
        if (odds < 0) {
            result = new Decimal(betMoney) //betMoney
        } else {
            result = new Decimal(odds).times(betMoney) //odds * betMoney
        }
        return result //parseFloat(result).toPrecision(12)
    },
    //decimal - 2,
    function(betMoney, odds) {
        betMoney = new Decimal(betMoney)
        odds = new Decimal(odds)
        const result = odds.minus(1).times(betMoney) //(odds - 1) * betMoney
        return result
    },
    //indo
    function(betMoney, odds) {
        betMoney = new Decimal(betMoney)
        odds = new Decimal(odds)
        if (odds > 0) {
            return odds.times(betMoney) //parseFloat(odds * betMoney).toPrecision(12)
        } else {
            return betMoney //parseFloat(betMoney).toPrecision(12)
        }
    },
    //hk
    function(betMoney, odds) {
        betMoney = new Decimal(betMoney)
        return betMoney.times(odds)
    }
]