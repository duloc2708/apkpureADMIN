export const helperConfig = {
    listMenuAccount: [
        { id: 'tab_profile', name: 'Profile' },
        { id: 'tab_info', name: 'Account Information' },
        { id: 'tab_changePassword', name: 'Change Pasword' },
        // { id: 'tab_settings', name: 'Settings' },
        // { id: 'tab_security', name: 'Security' }
    ],
    betList: {
        'Soccer': 'ic ic_mainmenu_soccer_active',
        29: 'ic ic_mainmenu_soccer_active',
        'Basketball': 'ic ic_mainmenu_basketball_active',
        4: 'ic ic_mainmenu_basketball_active',
        'Tennis': 'ic ic_mainmenu_tennis_active',
        33: 'ic ic_mainmenu_tennis_active',
        'E Sports': 'ic ic_mainmenu_esport_active',
        12: 'ic ic_mainmenu_esport_active',
        'Baseball': 'ic ic_mainmenu_baseball_active',
        3: 'ic ic_mainmenu_baseball_active',
        'Football': 'ic ic_mainmenu_football_active',
        15: 'ic ic_mainmenu_football_active',
        'Volleyball': 'ic ic_mainmenu_volleyball_active',
        34: 'ic ic_mainmenu_volleyball_active',
        'Badminton': 'ic ic_mainmenu_badminton_active',
        1: 'ic ic_mainmenu_badminton_active'
    },
    mapKeyToType: {
        1: 'DEBIT',
        2: 'CREDIT',
        3: 'BET',
        4: 'BET',
        8: 'BET',
        6: 'TRANSFER',
        7: 'TRANSFER'
    },
    mapKeyToMark: {
        1: 'DEPOSIT',
        2: 'WITHDRAWAL',
        3: 'PLACE BET',
        4: 'E BET',
        6: 'P2PLAY DEPOSIT',
        7: 'P2PLAY WITHDRAWAL',
        8: 'P2PLAY GAMES'
    },
    sideEU: [4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],

}
export const _parseOddsArray = [
    [
        function (value) {
            return new Decimal(value) //value
        }, //0-0
        function (value) { //0-1: american-malay
            return new Decimal(-100).dividedBy(value) //(-100 / value)
        },
        function (value) { //0-2: american-decimal
            switch (true) {
                case (value >= 0):
                    return (new Decimal(value).dividedBy(100)).plus(1) //((value / 100) + 1)
                case (value < 0):
                    return (new Decimal(-100).dividedBy(value)).plus(1) //((-100 / value) + 1)
                default:
                    return new Decimal(value) //value
            }
        },
        function (value) { //0-3: american-indo

            switch (true) {
                case (value >= 0):
                    return new Decimal(value).dividedBy(100) //(value / 100)
                case (value < 0):
                    return new Decimal(value).dividedBy(100) //(value / 100)
                default:
                    return value
            }
        },
        function (value) { //0-4 american-hk
            switch (true) {
                case (value >= 0):
                    return new Decimal(value).dividedBy(100)
                case (value < 0):
                    return new Decimal(-100).dividedBy(value)
            }
        }
    ],
    [
        function (value) { //1-0: malay-american
            return new Decimal(-100).dividedBy(value) //(-100 / value)
        },
        function (value) { //1-1: malay-malay
            return new Decimal(value) //value
        },
        function (value) { //1-2 malay-decimal
            let result = 0
            if (value > 0) {
                result = new Decimal(value).plus(1) //(value + 1)
            } else {
                result = (new Decimal(-1).dividedBy(value)).plus(1) //(-1 / value) + 1
            }
            return result
        },
        function (value) { //1-3 malay-indo
            return new Decimal(-1).dividedBy(value) //-1 / value
        },
        function (value) { //1-4 malay-hk
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
        function (value) { //2-0: decimal-american
            switch (true) {
                case (value >= 2):
                    return (new Decimal(value).minus(1)).times(100) //((value - 1) * 100)
                case (value < 2):
                    return new Decimal(-100).dividedBy(new Decimal(value).minus(1)) //(-100 / (value - 1))
                default:
                    return ''
            }
        },
        function (value) { //2-1: decimal-malay
            let result = null
            if (value >= 2) {
                result = new Decimal(-1).dividedBy(new Decimal(value).minus(1)) //-1 / (value - 1)
            } else {
                result = new Decimal(value).minus(1) //value -1
            }
            return result
        },
        function (value) { //2-2: decimal-decial
            return new Decimal(value) //value
        },
        function (value) { //2-3: decimal-indo
            let result = null
            if (value >= 2) {
                result = new Decimal(value).minus(1) //value -1
            } else {
                result = new Decimal(-1).dividedBy(new Decimal(value).minus(1)) //-1 / (value - 1)
            }
            return result
        },
        function (value) { //2-4: decimal-hk
            return new Decimal(value).minus(1) //value - 1
        }
    ],
    [
        function (value) { //3-0: indo-american
            switch (true) {
                case (value >= 1):
                    return new Decimal(value).times(100) //(value * 100)
                case (value < 1):
                    return new Decimal(value).times(100) //(value * 100)
            }
        },
        function (value) { //3-1 indo-malay
            return new Decimal(-1).dividedBy(value) //-1 / value
        },
        function (value) { //3-2 indo-decimal
            let result = 0
            if (value > 0) {
                result = new Decimal(value).plus(1) //(value + 1)
            } else {
                result = (new Decimal(-1).dividedBy(value)).plus(1) //(-1 / value) + 1
            }
            return result
        },
        function (value) { //3-3 indo-indo
            return new Decimal(value) //value
        },
        function (value) { //3-4 indo-hongkong
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
        function (value) { //4-0: hk-american
            switch (true) {
                case (value >= 1):
                    return new Decimal(value).times(100) //(value * 100)
                case (value < 1):
                    return new Decimal(-100).dividedBy(value) //(-100 / value)
            }
        },
        function (value) { //4-1 hk-malay
            switch (true) {
                case (value >= 1):
                    return new Decimal(value)
                case (value < 1):
                    return new Decimal(-1).dividedBy(value)

            }
        },
        function (value) { //4-2 hk-decimal
            return new Decimal(value).plus(1)
        },
        function (value) { //4-3 hk-indo
            switch (true) {
                case (value >= 1):
                    return new Decimal(value)
                case (value < 1):
                    return new Decimal(-1).dividedBy(value)
            }
        },
        function (value) { //4-4 hk-hk
            return new Decimal(result)
        }
    ]
]
export const _calculatorWinbet = [
    //american - 0
    function (betMoney, odds) {
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
    function (betMoney, odds) {
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
    function (betMoney, odds) {
        betMoney = new Decimal(betMoney)
        odds = new Decimal(odds)
        const result = odds.minus(1).times(betMoney) //(odds - 1) * betMoney
        return result
    },
    //indo
    function (betMoney, odds) {
        betMoney = new Decimal(betMoney)
        odds = new Decimal(odds)
        if (odds > 0) {
            return odds.times(betMoney) //parseFloat(odds * betMoney).toPrecision(12)
        } else {
            return betMoney //parseFloat(betMoney).toPrecision(12)
        }
    },
    //hk
    function (betMoney, odds) {
        betMoney = new Decimal(betMoney)
        return betMoney.times(odds)
    }
]
export const _roundSBO = (num, n) => {
    if (num) {
        // return Math.round(num * 100) / 100
        var temp = num.toString()
        if (temp.indexOf('.') != -1) {
            var indexDot = temp.indexOf('.');
            var sub = temp.substr(indexDot + 1, temp.length);
            if (sub[2] >= 5) {
                var compareString = new Decimal(`0.${sub.substr(0, 2)}`).plus(0.01);
                compareString = compareString.plus(temp.substr(0, indexDot))
                return compareString.toNumber();
            } else {
                var compareString = parseFloat(`${temp.substr(0, indexDot)}.${sub.substr(0, 2)}`);
                return compareString;
            }
        }
    } else {
        return num
    }
    return num
}
export const DisableWebKeyboard = () => {
    document.onkeydown = function (event) {
        event = event || window.event
        var control = event.which || event.keyCode || document.all
        switch (control) {
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
                event.preventDefault()
                event.stopPropagation()
        }
    }
}
export const _setCookie = (key, value, timeSet) => {
    let timeDefault = (1000 * 60 * 24 * 30 * 365)
    let timeEp = timeSet ? timeSet : timeDefault
    let expires = new Date()
    expires.setTime(expires.getTime() + timeEp)
    document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/'
}
export const _getCookie = (cname) => {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            if (c.substring(name.length, c.length) && c.substring(name.length, c.length) != 'null') {
                return decodeURIComponent(c.substring(name.length, c.length))
            }
        }
    }
    return null
}
export const _removeCookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
export const _getSubdomain = function (h) {
    let parts = h.split(".")
    if (parts.length == 2) return "www"
    return parts[0]
}
export const _base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (input) {
        let output = ""
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4
        let i = 0
        input = this._utf8_encode(input)
        while (i < input.length) {
            chr1 = input.charCodeAt(i++)
            chr2 = input.charCodeAt(i++)
            chr3 = input.charCodeAt(i++)
            enc1 = chr1 >> 2
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
            enc4 = chr3 & 63
            if (isNaN(chr2)) {
                enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
                enc4 = 64
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
        }
        return output
    },
    decode: function (input) {
        let output = ""
        let chr1, chr2, chr3
        let enc1, enc2, enc3, enc4
        let i = 0
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "")
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++))
            enc2 = this._keyStr.indexOf(input.charAt(i++))
            enc3 = this._keyStr.indexOf(input.charAt(i++))
            enc4 = this._keyStr.indexOf(input.charAt(i++))
            chr1 = (enc1 << 2) | (enc2 >> 4)
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
            chr3 = ((enc3 & 3) << 6) | enc4
            output = output + String.fromCharCode(chr1)
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2)
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3)
            }
        }
        output = this._utf8_decode(output)
        return output
    },
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n")
        let utftext = ""
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n)
            if (c < 128) {
                utftext += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192)
                utftext += String.fromCharCode((c & 63) | 128)
            } else {
                utftext += String.fromCharCode((c >> 12) | 224)
                utftext += String.fromCharCode(((c >> 6) & 63) | 128)
                utftext += String.fromCharCode((c & 63) | 128)
            }
        }
        return utftext
    },
    _utf8_decode: function (utftext) {
        let string = ""
        let i = 0
        let c = 0
        let c1 = 0
        let c2 = 0
        let c3 = 0
        while (i < utftext.length) {
            c = utftext.charCodeAt(i)
            if (c < 128) {
                string += String.fromCharCode(c)
                i++
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1)
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
                i += 2
            } else {
                c2 = utftext.charCodeAt(i + 1)
                c3 = utftext.charCodeAt(i + 2)
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
                i += 3
            }
        }
        return string
    }
}
export const detectMobile = () => {
    let testExp = new RegExp('Android|webOS|iPhone|iPad|' +
        'BlackBerry|Windows Phone|' +
        'Opera Mini|IEMobile|Mobile',
        'i')
    if (testExp.test(navigator.userAgent)) {
        // devivce mobile
        return true
    } else {
        return false
    }
}
export const _getParams = (url_string, key) => {
    const url = new URL(url_string)
    const val = url.searchParams.get(key)
    return val
}
export const _formatMoney = (num) => {
    if (num && !_.isNaN(num)) {
        let p = (num.toString()).split(".")
        return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc
        }, "") + "." + (p[1] && p[1].length > 1 ? p[1].substring(0, 2) : p[1] && p[1].length == 1 ? p[1] + '0' : '00')
    }
    return '0.00'
}
export const _GMTFormat = (timeStr) => {
    const off = timeStr[0]
    const val = timeStr.substring(1, timeStr.length)
    return `GMT${off}${parseInt(val)}`
}
export const _getOddsItems = () => {
    return {
        0: {
            name: 'am'
        },
        1: {
            name: 'my'
        },
        2: {
            name: 'eu'
        },
        3: {
            name: 'id'
        },
        4: {
            name: 'hk'
        }
    }
}
export const _mapStatementStatusToClass = (status) => {
    return {
        true: 'ic ic_x',
        false: 'ic ic_sidemenu_statement'
    }[status]
}
export const _mapAccountStatusToClass = (status) => {
    return {
        true: 'ic ic_x',
        false: 'ic ic_sidemenu_profile'
    }[status]
}
export const _mapResultStatusToClass = (status) => {
    return {
        true: 'ic ic_x',
        false: 'ic ic_sidemenu_result'
    }[status]
}
export const _mapBetlistStatusToClass = (status) => {
    return {
        true: 'ic ic_x',
        false: 'ic ic_sidemenu_betlist'
    }[status]
}
export const checkExistsEgames = (code) => {
    if (['poker', 'threecards', 'thirteencards', 'dominoesqq', 'ceme', 'ceme_keliling', 'capsa'].indexOf(code) != -1) {
        return true
    } else {
        return false
    }
}
export const _parseOddsEntry = (objOdds, oddsEntry, notRound) => {
    let temp = null
    switch (true) {
        //same odds
        case (objOdds.type == oddsEntry):
            return objOdds.value
        //another odds
        case (objOdds.type != oddsEntry):
            switch (true) {
                case (objOdds.type == null):
                    return null
                //default odds - parse Amecican to --> oddsEntry
                case (objOdds.type != 0 &&
                    typeof _parseOddsArray[objOdds.type][oddsEntry] != 'function'):
                    temp = _parseOddsArray[0][oddsEntry](_parseOddsArray[objOdds.type][0](objOdds.value))
                    return notRound == true ? temp : roundOdds(temp)
                case (objOdds.type != 0 &&
                    typeof _parseOddsArray[objOdds.type][oddsEntry] == 'function'):
                    temp = _parseOddsArray[objOdds.type][oddsEntry](objOdds.value)
                    return roundOdds(temp)
                case (objOdds.type == 0):
                    //parse value objOdds --> American --> oddsEntry
                    temp = _parseOddsArray[objOdds.type][oddsEntry](objOdds.value)
                    return notRound == true ? temp : roundOdds(temp)
            }
    }
}
export const roundOdds = (odds) => {
    function _subDecimal(num, n = 2) {
        if (!_.isUndefined(num) &&
            !_.isNull(num)) {
            num = new Decimal(num)
            if (num.toString().indexOf('.') != -1) {
                let inte = num.toString().substr(0, num.toString().indexOf('.'))
                let deci = num.toString().substr(num.toString().indexOf('.') + 1, n)
                return inte + '.' + deci
            } else {
                return num
            }
        } else {
            return num
        }
        return num
    }
    let finalOdds = null,
        oriOdds = null,
        subOdds = null
    if (odds) {
        oriOdds = odds
        subOdds = (new Decimal(oriOdds).toString()).substring(0, oriOdds > 0 ? 5 : 6)
        if (oriOdds == subOdds) {
            finalOdds = _subDecimal(oriOdds, 2)
        } else {
            if (oriOdds < 0) {
                finalOdds = _subDecimal(new Decimal(subOdds).minus(0.01), 2)
            } else {
                finalOdds = _subDecimal(oriOdds, 2)
            }
        }
    }
    return finalOdds
}

export const pad = (str, max) => {
    function pad(str, max) {
        str = str.toString()
        return str.length < max ? pad("0" + str, max) : str
    }
    return pad(str, max)
}

export const _subDecimal = (num, n = 2) => {
    if (!_.isUndefined(num) &&
        !_.isNull(num)) {
        if (num.toString().indexOf('.') != -1) {
            let inte = num.toString().substr(0, num.toString().indexOf('.'))
            let deci = num.toString().substr(num.toString().indexOf('.') + 1, n)
            return inte + '.' + deci
        } else {
            return num
        }
    } else {
        return num
    }
    return num
}
export const _getColorWithStatus = (status, type = 0) => {
    if (type == 0) {
        switch (status) {
            case 1:
                return 'green'
            case 3:
                return 'won'
            case 4:
                return 'lose'
            case 5:
                return 'drawn'
            case 20:
                return 'darkblue'
            case 21:
                return 'winJackpot'
            case 22:
                return 'winJackpot'
            default:
                break
        }
    } else {
        switch (status) {
            case 1:
                return 'text-green'
            case 3:
                return 'text-info'
            case 4:
                return 'text-red'
            default:
                break
        }
    }
}
export const _getMarkets = () => {
    return {
        0: {
            name: 'today',
            count: 0,
            order: 2,
            sports: [29, 4, 33, 15, 12, 3, 34, 1]
        },
        1: {
            name: 'live',
            count: 0,
            order: 1,
            sports: [29, 4, 33, 15, 12, 3, 34, 1]
        },
        2: {
            name: 'early',
            count: 0,
            order: 3,
            sports: [29, 4, 33, 15, 12, 3, 34, 1]
        },
        5: {
            name: 'OE & TG',
            count: 0,
            order: 4,
            sports: [29, 4]
        },
        3: {
            name: '1X2 & DC',
            count: 0,
            order: 5,
            sports: [29]
        },
        6: {
            name: 'FT & FH CS',
            count: 0,
            order: 6,
            sports: [29]
        },
        8: {
            name: 'HT / FT',
            count: 0,
            order: 7,
            sports: [29]
        },
        9: {
            name: 'FG & LG',
            count: 0,
            order: 8,
            sports: [29]
        },
        7: {
            name: 'Mix Parlay',
            count: 0,
            order: 9,
            sports: [29, 4, 33, 15, 12, 3, 34, 1]
        },
        4: {
            name: 'outright',
            count: 0,
            order: 10,
            sports: [29, 4, 33, 15, 12, 3, 34, 1]
        }
    }
}
export const _mapSportToIcon = (sportID, isVirtualSports) => {
    return {
        'Soccer': isVirtualSports ? 'ic ic_vs_soccer' : 'ic ic_mainmenu_soccer',
        'Basketball': isVirtualSports ? 'ic ic_vs_basketball' : 'ic ic_mainmenu_basketball',
        'Tennis': isVirtualSports ? 'ic ic_vs_tennis' : 'ic ic_mainmenu_tennis',
        '12': 'ic ic_mainmenu_esport',
        '3': 'ic ic_mainmenu_baseball',
        '15': 'ic ic_mainmenu_football',
        '34': 'ic ic_mainmenu_volleyball',
        '1': 'ic ic_mainmenu_badminton'
    }[sportID]
}
export const _getHeaderForMarket = (market, mode) => {
    switch (parseInt(mode)) {
        case 1: //single view
            return {
                0: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        className: null,
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: 1,
                        rowSpan: 2,
                        className: null,
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 6,
                        rowSpan: 1,
                        width: null,
                        className: null,
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 6,
                        rowSpan: 1,
                        width: null,
                        className: null,
                        type: 'header'
                    }
                }, {
                    0: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    9: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    10: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    11: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    }
                }],
                7: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '60px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 2,
                        // width: '125px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 6,
                        rowSpan: '',
                        width: '',
                        className: 'separator',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 6,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: 'text-center',
                        type: 'odds'
                    },
                    7: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    9: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    10: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    11: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    }
                }],
                1: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '60px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 2,
                        // width: '125px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 6,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 6,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: 'text-center',
                        type: 'odds'
                    },
                    8: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    9: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    10: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    11: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    }
                }],
                2: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 2,
                        // width: '125px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 6,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 6,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    9: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    10: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    },
                    11: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        minWidth: '50px',
                        maxWidth: '50px',
                        className: '',
                        type: 'odds'
                    }
                }],
                4: [{
                    0: {
                        value: 'contest',
                        colSpan: 8,
                        rowSpan: '',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'odds',
                        colSpan: '',
                        rowSpan: '',
                        width: '100px',
                        className: '',
                        type: 'header'
                    }
                }],
                3: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 2,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: 'Double Chance',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: '1',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'x',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: '2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: '1',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 2,
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'x',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: '2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: '1X',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 2,
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: '12',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'X2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    }
                }],
                5: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '6',
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'Odd',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: 'Even',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: '0~1',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    5: {
                        value: '2~3',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    6: {
                        value: '4~6',
                        colSpan: '',
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    7: {
                        value: '7 & Over',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }],
                6: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: '1:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: '2:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: '2:1',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    5: {
                        value: '3:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    6: {
                        value: '3:1',
                        colSpan: '',
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    7: {
                        value: '3:2',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    8: {
                        value: '4:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    9: {
                        value: '4:1',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    10: {
                        value: '4:2',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    11: {
                        value: '4:3',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    12: {
                        value: '0:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    13: {
                        value: '1:1',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    14: {
                        value: '2:2',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    15: {
                        value: '3:3',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    16: {
                        value: '4:4',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    17: {
                        value: 'AOS',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }],
                8: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '6',
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'HH',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: 'HD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: 'HA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    5: {
                        value: 'DH',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    6: {
                        value: 'DD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    7: {
                        value: 'DA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    8: {
                        value: 'AH',
                        colSpan: '',
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    9: {
                        value: 'AD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    10: {
                        value: 'AA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }],
                9: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '6',
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'First Goal',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: 'Last Goal',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: 'No Goal',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }],
            }[market]
            break
        case 2: //double view
            return {
                0: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 2,
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 4,
                        rowSpan: '',
                        width: '',
                        className: 'separator',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 2,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    }
                }],
                7: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '60px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 2,
                        // width: '125px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 4,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 2,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                }],
                1: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '60px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 2,
                        // width: '125px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 4,
                        rowSpan: '',
                        width: '',
                        className: 'separator',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 2,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                }],
                2: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 2,
                        // width: '125px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 4,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 2,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    }
                }],
                4: [{
                    0: {
                        value: 'contest',
                        colSpan: 8,
                        rowSpan: '',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'odds',
                        colSpan: '',
                        rowSpan: '',
                        width: '100px',
                        className: '',
                        type: 'header'
                    }
                }],
                3: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 2,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'fullTime',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: 'Double Chance',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: '1',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'x',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: '2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: '1',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 2,
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'x',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: '2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: '1X',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 2,
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: '12',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'X2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: 1,
                        className: '',
                        type: 'odds'
                    }
                }],
                5: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '6',
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'Odd',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: 'Even',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: '0~1',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    5: {
                        value: '2~3',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    6: {
                        value: '4~6',
                        colSpan: '',
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    7: {
                        value: '7 & Over',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }],
                6: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: '1:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: '2:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: '2:1',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    5: {
                        value: '3:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    6: {
                        value: '3:1',
                        colSpan: '',
                        rowSpan: '',
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    7: {
                        value: '3:2',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    8: {
                        value: '4:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    9: {
                        value: '4:1',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    10: {
                        value: '4:2',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    11: {
                        value: '4:3',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    12: {
                        value: '0:0',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    13: {
                        value: '1:1',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    14: {
                        value: '2:2',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    15: {
                        value: '3:3',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    16: {
                        value: '4:4',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    17: {
                        value: 'AOS',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }],
                8: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '6',
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'HH',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: 'uppercase',
                        type: 'header'
                    },
                    3: {
                        value: 'HD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: 'uppercase',
                        type: 'header'
                    },
                    4: {
                        value: 'HA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: 'uppercase',
                        type: 'header'
                    },
                    5: {
                        value: 'DH',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: 'uppercase',
                        type: 'header'
                    },
                    6: {
                        value: 'DD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: 'uppercase',
                        type: 'header'
                    },
                    7: {
                        value: 'DA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: 'uppercase',
                        type: 'header'
                    },
                    8: {
                        value: 'AH',
                        colSpan: '',
                        rowSpan: '',
                        width: '',
                        className: 'uppercase',
                        type: 'header'
                    },
                    9: {
                        value: 'AD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: 'uppercase',
                        type: 'header'
                    },
                    10: {
                        value: 'AA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: 'uppercase',
                        type: 'header'
                    }
                }],
                9: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '100px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: '6',
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'First Goal',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: 'Last Goal',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: 'No Goal',
                        colSpan: '',
                        rowSpan: 1,
                        width: '',
                        className: '',
                        type: 'header'
                    }
                }]
            }[market]
            break
        default:
            return
    }
}
