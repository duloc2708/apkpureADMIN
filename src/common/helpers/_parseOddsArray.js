module.exports = [
    [
        function(value) {
            return new Decimal(value) //value
        }, //0-0
        function(value) { //0-1: american-malay
            return new Decimal(-100).dividedBy(value) //(-100 / value)
        },
        function(value) { //0-2: american-decimal
            switch (true) {
                case (value >= 0):
                    return (new Decimal(value).dividedBy(100)).plus(1) //((value / 100) + 1)
                case (value < 0):
                    return (new Decimal(-100).dividedBy(value)).plus(1) //((-100 / value) + 1)
                default:
                    return new Decimal(value) //value
            }
        },
        function(value) { //0-3: american-indo

            switch (true) {
                case (value >= 0):
                    return new Decimal(value).dividedBy(100) //(value / 100)
                case (value < 0):
                    return new Decimal(value).dividedBy(100) //(value / 100)
                default:
                    return value
            }
        },
        function(value) { //0-4 american-hk
            switch (true) {
                case (value >= 0):
                    return new Decimal(value).dividedBy(100)
                case (value < 0):
                    return new Decimal(-100).dividedBy(value)
            }
        }
    ],
    [
        function(value) { //1-0: malay-american
            return new Decimal(-100).dividedBy(value) //(-100 / value)
        },
        function(value) { //1-1: malay-malay
            return new Decimal(value) //value
        },
        function(value) { //1-2 malay-decimal
            let result = 0
            if (value > 0) {
                result = new Decimal(value).plus(1) //(value + 1)
            } else {
                result = (new Decimal(-1).dividedBy(value)).plus(1) //(-1 / value) + 1
            }
            return result
        },
        function(value) { //1-3 malay-indo
            return new Decimal(-1).dividedBy(value) //-1 / value
        },
        function(value) { //1-4 malay-hk
            let result = 0
            if (value > 0) {
                result = new Decimal(value) //(value)
            } else {
                result = new Decimal(-1).dividedBy(value) //(-1 / value)
            }
            return result
        }
    ],
    [
        function(value) { //2-0: decimal-american
            switch (true) {
                case (value >= 2):
                    return (new Decimal(value).minus(1)).times(100) //((value - 1) * 100)
                case (value < 2):
                    return new Decimal(-100).dividedBy(new Decimal(value).minus(1)) //(-100 / (value - 1))
                default:
                    return ''
            }
        },
        function(value) { //2-1: decimal-malay
            let result = null
            if (value >= 2) {
                result = new Decimal(-1).dividedBy(new Decimal(value).minus(1)) //-1 / (value - 1)
            } else {
                result = new Decimal(value).minus(1) //value -1
            }
            return result
        },
        function(value) { //2-2: decimal-decial
            return new Decimal(value).toString() //value
        },
        function(value) { //2-3: decimal-indo
            let result = null
            if (value >= 2) {
                result = new Decimal(value).minus(1) //value -1
            } else {
                result = new Decimal(-1).dividedBy(new Decimal(value).minus(1)) //-1 / (value - 1)
            }
            return result
        },
        function(value) { //2-4: decimal-hk
            return new Decimal(value).minus(1) //value - 1
        }
    ],
    [
        function(value) { //3-0: indo-american
            switch (true) {
                case (value >= 1):
                    return new Decimal(value).times(100) //(value * 100)
                case (value < 1):
                    return new Decimal(value).times(100) //(value * 100)
            }
        },
        function(value) { //3-1 indo-malay
            return new Decimal(-1).dividedBy(value) //-1 / value
        },
        function(value) { //3-2 indo-decimal
            let result = 0
            if (value > 0) {
                result = new Decimal(value).plus(1) //(value + 1)
            } else {
                result = (new Decimal(-1).dividedBy(value)).plus(1) //(-1 / value) + 1
            }
            return result
        },
        function(value) { //3-3 indo-indo
            return new Decimal(value) //value
        },
        function(value) { //3-4 indo-hongkong
            let result = 0
            if (value > 0) {
                result = new Decimal(value) //(value)
            } else {
                result = new Decimal(-1).dividedBy(value) //(-1 / value)
            }
            return result
        }
    ],
    [
        function(value) { //4-0: hk-american
            switch (true) {
                case (value >= 1):
                    return new Decimal(value).times(100) //(value * 100)
                case (value < 1):
                    return new Decimal(-100).dividedBy(value) //(-100 / value)
            }
        },
        function(value) { //4-1 hk-malay
            switch (true) {
                case (value >= 1):
                    return new Decimal(value)
                case (value < 1):
                    return new Decimal(-1).dividedBy(value)

            }
        },
        function(value) { //4-2 hk-decimal
            return new Decimal(value).plus(1)
        },
        function(value) { //4-3 hk-indo
            switch (true) {
                case (value >= 1):
                    return new Decimal(value)
                case (value < 1):
                    return new Decimal(-1).dividedBy(value)
            }
        },
        function(value) { //4-4 hk-hk
            return new Decimal(result)
        }
    ]
]