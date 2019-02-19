module.exports = {
    
    list_lang_playtech: [
        { key: 'zh-cn', value: 'zhCN', name: '简体中文' },
        { key: 'ch', value: 'ch', name: '繁體中文' },
        { key: 'en', value: 'enGB', name: 'English' },
        { key: 'ja', value: 'ja', name: '日本語' },
        { key: 'ko', value: 'ko', name: '한국어' },
        { key: 'ru', value: 'ru', name: 'Русский' },
        { key: 'es', value: 'es', name: 'Español' },
        { key: 'fr', value: 'fr', name: 'Français' },
        { key: 'it', value: 'it', name: 'Italiano' }
    ],
    get_type_message: [
        { key: 1, name: 'Nomal' },
        { key: 2, name: 'Special' },
        { key: 3, name: 'Personal' }
    ],
    list_icon_sidebar: [
        { code: 'betlist', ic: 'ic_sidemenu_betlist' },
        { code: 'account', ic: 'ic_sidemenu_profile' },
        { code: 'livestream', ic: 'ic_sidemenu_streaming' },
        { code: 'result', ic: 'ic_sidemenu_result' },
        { code: 'statement', ic: 'ic_sidemenu_statement' }
    ],
    arr_card: [
        { code: 'd', class: 'diamons' },
        { code: 'c', class: 'clubs' },
        { code: 's', class: 'spades' },
        { code: 'h', class: 'hearts' },
    ],
    arr_tiles: [
        { code: 0, class: '' },
        { code: 1, class: 'one' },
        { code: 2, class: 'two' },
        { code: 3, class: 'three' },
        { code: 4, class: 'four' },
        { code: 5, class: 'five' },
        { code: 6, class: 'six' },
    ],
    listInfoEgames: [
        { code: 'poker', name: 'TEXAS POKER', class: 'texas_poker' },
        { code: 'threecards', name: '3 KINGS', class: 'kings_3' },
        { code: 'thirteencards', name: 'BIG 2', class: 'big_2' },
        { code: 'ceme', name: 'DOMINO 2K', class: 'domino_2k' },
        { code: 'ceme_keliling', name: 'DOMINO+', class: '' },
        { code: 'capsa', name: '13 CARDS', class: 'cards_13' },
        { code: 'dominoesqq', name: 'DOMINO 4K', class: 'domino_4k' },
    ],
    numberTicketView: 35,
    sortResult: [{ value: 'normal' }, { value: 'time' }],

    groupCorners: {
        13: "Total Corners",
        14: "Total Corners",
        17: "Total Bookings",
        18: "Total Bookings",
    },
    sportIdToName: {
        1: "Badminton",
        3: "Baseball",
        4: "Basketball",
        8: "Cricket",
        12: "E Sports",
        15: "Football",
        19: "Hockey",
        29: "Soccer",
        33: "Tennis",
        34: "Volleyball",
        100: "Palay",
    },
    headerResult: {
        29: [{
            key: 'Date & Time',
            value: null,
            class: 'date',
            type: 'header'
        }, {
            key: 'Match',
            value: null,
            type: 'header',
            class: 'match'
        }, {
            key: '2ndH',
            value: 2,
            class: 'score',
            type: 'result'
        }, {
            key: '1stH',
            value: 1,
            class: 'score',
            type: 'result'
        }, {
            key: 'ft',
            value: 0,
            class: 'score',
            type: 'result'
        }],
        4: [{
            key: 'Date & Time',
            value: null,
            class: 'date',
            type: 'header'
        }, {
            key: 'Match',
            value: null,
            type: 'header',
            class: 'match'
        }, {
            key: '4thQ',
            value: 6,
            type: 'result',
            class: 'score',
        }, {
            key: '3rdQ',
            value: 5,
            type: 'result',
            class: 'score',
        }, {
            key: '2ndQ',
            value: 4,
            type: 'result',
            class: 'score',
        }, {
            key: '1stQ',
            value: 3,
            type: 'result',
            class: 'score',
        }, {
            key: '2ndH',
            value: 2,
            type: 'result',
            class: 'score',
        }, {
            key: '1stH',
            value: 1,
            type: 'result',
            class: 'score',
        }, {
            key: 'ft',
            value: 0,
            type: 'result',
            class: 'score',
        }],
        12: [{
            key: 'Date & Time',
            value: null,
            class: 'date',
            type: 'header'
        }, {
            key: 'Match',
            value: null,
            type: 'header',
            class: 'match'
        }, {
            key: 'map5',
            value: 5,
            type: 'result',
            class: 'score',
        }, {
            key: 'map4',
            value: 4,
            type: 'result',
            class: 'score',
        }, {
            key: 'map3',
            value: 3,
            type: 'result',
            class: 'score',
        }, {
            key: 'map2',
            value: 2,
            type: 'result',
            class: 'score',
        }, {
            key: 'map1',
            value: 1,
            type: 'result',
            class: 'score',
        }, {
            key: 'match',
            value: 0,
            type: 'result',
            class: 'score',
        }],
        33: [{
            key: 'Date & Time',
            value: null,
            class: 'date',
            type: 'header'
        }, {
            key: 'Match',
            value: null,
            type: 'header',
            class: 'match'
        }, {
            key: '5thS',
            value: 5,
            type: 'result',
            class: 'score',
        }, {
            key: '4thS',
            value: 4,
            type: 'result',
            class: 'score',
        }, {
            key: '3rdS',
            value: 3,
            type: 'result',
            class: 'score',
        }, {
            key: '2ndS',
            value: 2,
            type: 'result',
            class: 'score',
        }, {
            key: '1stS',
            value: 1,
            type: 'result',
            class: 'score',
        }, {
            key: 'ft',
            value: 0,
            type: 'result',
            class: 'score',
        }],
        3: [{
            key: 'Date & Time',
            value: null,
            class: 'date',
            type: 'header'
        }, {
            key: 'Match',
            value: null,
            type: 'header',
            class: 'match'
        }, {
            key: '1stInn',
            value: 10,
            class: 'score',
            type: 'result'
        }, {
            key: '1stH',
            value: 1,
            class: 'score',
            type: 'result'
        }, {
            key: 'ft',
            value: 0,
            class: 'score',
            type: 'result'
        }],
        15: [{
            key: 'Date & Time',
            value: null,
            class: 'date',
            type: 'header'
        }, {
            key: 'Match',
            value: null,
            type: 'header',
            class: 'match'
        }, {
            key: '2ndH',
            value: 2,
            class: 'score',
            type: 'result'
        }, {
            key: '1stH',
            value: 1,
            class: 'score',
            type: 'result'
        }, {
            key: 'ft',
            value: 0,
            class: 'score',
            type: 'result'
        }],
        34: [{
            key: 'Date & Time',
            value: null,
            class: 'date',
            type: 'header'
        }, {
            key: 'Match',
            value: null,
            type: 'header',
            class: 'match'
        }, {
            key: '5thS',
            value: 5,
            class: 'score',
            type: 'result'
        }, {
            key: '4thS',
            value: 4,
            class: 'score',
            type: 'result'
        }, {
            key: '3rdS',
            value: 3,
            class: 'score',
            type: 'result'
        }, {
            key: '2ndS',
            value: 2,
            class: 'score',
            type: 'result'
        }, {
            key: '1stS',
            value: 1,
            class: 'score',
            type: 'result'
        }, {
            key: 'ft',
            value: 0,
            class: 'score',
            type: 'result'
        }],
        1: [{
            key: 'Date & Time',
            value: null,
            class: 'date',
            type: 'header'
        }, {
            key: 'Match',
            value: null,
            type: 'header',
            class: 'match'
        }, {
            key: '2ndH',
            value: 2,
            class: 'score',
            type: 'result'
        }, {
            key: '1stH',
            value: 1,
            class: 'score',
            type: 'result'
        }, {
            key: 'ft',
            value: 0,
            class: 'score',
            type: 'result'
        }],
    },
    refreshTime: {
        'live': 20,
        'today': 60,
        'early': 60,
        'virtual': 15
    },
    arrMarkSingle: [0, 1, 2, 3, 13, 14, 17, 18],
    mapStatusToTimeLive: {
        1: {
            val: 'FIRST HALF',
            code: '1H'
        },
        2: {
            val: 'HALF TIME',
            code: 'HT'
        },
        3: {
            val: 'SECOND HALF',
            code: '2H'
        },
        4: {
            val: 'END OF REGULAR TIME',
            code: 'EORT'
        },
        5: {
            val: 'FIRST HALF EXTRA TIME',
            code: '1E'
        },
        6: {
            val: 'EXTRA TIME HALF TIME',
            code: 'HTE'
        },
        7: {
            val: 'SECOND HALF EXTRA TIME',
            code: '2E'
        },
        8: {
            val: 'END OF EXTRA TIME',
            code: 'EOET'
        },
        9: {
            val: 'END OF GAME',
            code: 'EOG'
        },
        10: {
            val: 'GAME IS TEMPORARY SUSPENDED',
            code: 'GITS'
        },
        11: {
            val: 'PENALTIES',
            code: 'PEN'
        },
        default: {
            val: '',
            code: ''
        }
    },
    matchView: 20,
    mapSideToPeriod: {
        0: 'Handicap',
        1: 'Handicap',
        2: 'Over/Under',
        3: 'Over/Under',
        4: '1X2',
        5: '1X2',
        6: '1X2',
        8: 'Odd/Even',
        9: 'Odd/Even',
        10: 'Outright',
        11: 'Total Goal',
        12: 'Total Goal',
        13: 'Total Goal',
        14: 'Total Goal',
        15: 'Double Chance',
        16: 'Double Chance',
        17: 'Double Chance',
        18: 'Correct Score',
        19: "Correct Score",
        20: "Correct Score",
        21: "Correct Score",
        22: "Correct Score",
        23: "Correct Score",
        24: "Correct Score",
        25: "Correct Score",
        26: "Correct Score",
        27: "Correct Score",
        28: "Correct Score",
        29: "Correct Score",
        30: "Correct Score",
        31: "Correct Score",
        32: "Correct Score",
        33: "Correct Score",
        34: "Correct Score",
        35: "Correct Score",
        36: "Correct Score",
        37: "Correct Score",
        38: "Correct Score",
        39: "Correct Score",
        40: "Correct Score",
        41: "Correct Score",
        42: "Correct Score",
        43: "Correct Score",
        44: 'First Goal/Last Goal',
        45: 'First Goal/Last Goal',
        46: 'First Goal/Last Goal',
        47: 'First Goal/Last Goal',
        48: 'First Goal/Last Goal',
        49: 'HT/FT',
        50: 'HT/FT',
        51: 'HT/FT',
        52: 'HT/FT',
        53: 'HT/FT',
        54: 'HT/FT',
        55: 'HT/FT',
        56: 'HT/FT',
        57: 'HT/FT'
    },
    mapMarketToTitle: {
        0: 'FT',
        1: '1st Half',
        10: 'Outright',
        11: 'First Goal/Last Goal',
        13: 'FT Corners',
        14: '1st Half Corners',
        17: 'FT Bookings',
        18: '1st Half Bookings',
        15: 'First Corners/ Last Corners'
    },
    mapSideToTeam: {
        0: 'Team1',
        1: 'Team2',
        2: 'Over',
        3: 'Under',
        4: 'Team1',
        5: 'Team2',
        6: 'Draw',
        7: 'Team2',
        8: 'Odd',
        9: 'Even',
        11: '0~1',
        12: '2~3',
        13: '4~6',
        14: '7 & Over',
        10: 'Team1',
        15: '1X',
        16: '2X',
        17: '12',
        18: 'AOS',
        19: "0:0",
        20: "0:1",
        21: "0:2",
        22: "0:3",
        23: "1:0",
        24: "1:1",
        25: "1:2",
        26: "1:3",
        27: "2:0",
        28: "2:1",
        29: "2:2",
        30: "2:3",
        31: "3:0",
        32: "3:1",
        33: "3:2",
        34: "3:3",
        35: "4:0",
        36: "4:1",
        37: "4:2",
        38: "4:3",
        39: "0:4",
        40: "1:4",
        41: "2:4",
        42: "3:4",
        43: "4:4",
        44: 'HF',
        45: 'HL',
        46: 'AF',
        47: 'AL',
        48: 'No Goal',
        49: 'HH',
        50: 'HD',
        51: 'HA',
        52: 'DH',
        53: 'DD',
        54: 'DA',
        55: 'AH',
        56: 'AD',
        57: 'AA'
    },
    sideEU: [4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],

}