const sportConfig = {
    listCLSP: ["B", "E", "P", "R"],
    listReport: [
        { type: "001", title: "Tổng hợp đá theo Order" },
        { type: "002", title: "Tổng hợp đá nhập Order theo BAG" }
    ],
    listLogo: [
        {
            host: "localhost",
            logo: "/images/logo.png",
            class: "logo",
            title: "7Sports.co"
        },
        {
            host: "7sports",
            logo: "/images/logo.png",
            class: "logo",
            title: "7Sports.co"
        },
        {
            host: "tujuh",
            logo: "/images/logo_Tujuh.png",
            class: "logo tujuh",
            title: "Tujuh Sports"
        },
        {
            host: "klik7",
            logo: "/images/logo_Klik.png",
            class: "logo klik",
            title: "Klik7 Sports"
        }
    ],
    listIcon: [
        { host: "localhost", icon: "/7sports.ico" },
        { host: "7sports", icon: "/7sports.ico" },
        { host: "tujuhsports", icon: "/7sports.ico" },
        { host: "klik7sports", icon: "/7sports.ico" }
    ],
    expireLogin: 60 * 60 * 24 * 30,
    expireBetSlip: 60,
    theme: {
        themeHomeTeam: "bold text-primary",
        themeAwayTeam: "bold text-secondary", //not css
        iconOddsUp: "fa fa-sort-desc",
        iconOddsDown: "fa fa-sort-desc",
        oddsPositive: "",
        oddsNegative: "text-red",
        live: {
            header: "bg-orange",
            subTable: "bg-light-orange"
        },
        normal: {
            header: "bg-dark-blue",
            subTable: "bg-light-blue"
        }
    },
    refreshTime: {
        0: 75,
        1: 20,
        2: 75
    },
    sideEU: [
        4,
        5,
        6,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57
    ],
    refreshTimeTicket: 11,
    favourite: {
        29: {
            key: "soccer",
            active: true,
            icon: "ic ic_soccer_blue"
        },
        4: {
            key: "basketball",
            active: false,
            icon: "ic ic_basketball_blue"
        },
        12: {
            key: "eSports",
            active: false,
            icon: "ic ic_esport_blue"
        },
        33: {
            key: "tennis",
            active: false,
            icon: "ic ic_tennis_blue"
        },
        3: {
            key: "baseball",
            active: false,
            icon: "ic ic_baseball_blue"
        },
        15: {
            key: "football",
            active: false,
            icon: "ic ic_football_blue"
        },
        34: {
            key: "volleyball",
            active: false,
            icon: "ic ic_volleyball_blue"
        },
        1: {
            key: "badminton",
            active: false,
            icon: "ic ic_badminton_blue"
        }
    },
    sportImgs: {
        29: "/images/icon-soccer-white.png",
        Soccer: "/images/icon-soccer.png",
        4: "/images/icon-basketball-white.png",
        Basketball: "/images/icon-basketball.png",
        33: "/images/ic_tennis_white.png",
        Tennis: "/images/icon-tennis.png",
        12: "/images/icon-esports-white.png",
        "E Sports": "/images/icon-esports.png",
        3: "/images/ic_baseball_white.png",
        Baseball: "/images/ic_baseball_blue.png",
        15: "/images/ic_football_white.png",
        Football: "/images/ic_football_blue.png",
        34: "/images/ic_volleyball_white.png",
        Volleyball: "/images/ic_volleyball_blue.png",
        1: "/images/icon-badminton-white.png",
        Badminton: "/images/icon-badminton-blue.png",
        black: {
            29: "/images/icon-soccer.png",
            4: "/images/icon-basketball.png",
            33: "/images/icon-tennis.png",
            12: "/images/icon-esports.png",
            1: "/images/icon-badminton-blue.png"
        }
    },
    betList: {
        Soccer: "ic ic_soccer_blue",
        29: "ic ic_soccer_blue",
        Basketball: "ic ic_basketball_blue",
        4: "ic ic_basketball_blue",
        Tennis: "ic ic_tennis_blue",
        33: "ic ic_tennis_blue",
        "E Sports": "ic ic_esport_blue",
        12: "ic ic_esport_blue",
        Baseball: "ic ic_baseball_blue",
        3: "ic ic_baseball_blue",
        Football: "ic ic_football_blue",
        15: "ic ic_football_blue",
        Volleyball: "ic ic_volleyball_blue",
        34: "ic ic_volleyball_blue",
        Badminton: "ic ic_badminton_blue",
        1: "ic ic_badminton_blue"
    },
    myTicket: {
        Soccer: "ic ic_soccer_blue",
        Basketball: "ic ic_basketball_blue",
        Tennis: "ic ic_tennis_blue",
        "E Sports": "ic ic_esport_blue",
        Baseball: "ic ic_baseball_blue",
        Football: "ic ic_football_blue",
        Volleyball: "ic ic_volleyball_blue",
        Badminton: "ic ic_badminton_blue"
    },
    headerResult: {
        29: [
            {
                key: "time",
                value: null,
                width: "140px",
                type: "header"
            },
            {
                key: "MATCH",
                value: null,
                type: "header"
            },
            {
                key: "ft",
                value: 0,
                width: "80px",
                type: "result"
            },
            {
                key: "1stH",
                value: 1,
                width: "80px",
                type: "result"
            },
            {
                key: "2ndH",
                value: 2,
                width: "80px",
                type: "result"
            }
        ],
        4: [
            {
                key: "time",
                value: null,
                type: "header"
            },
            {
                key: "MATCH",
                value: null,
                type: "header"
            },
            {
                key: "ft",
                value: 0,
                type: "result"
            },
            {
                key: "1stH",
                value: 1,
                type: "result"
            },
            {
                key: "2ndH",
                value: 2,
                type: "result"
            },
            {
                key: "1stQ",
                value: 3,
                type: "result"
            },
            {
                key: "2ndQ",
                value: 4,
                type: "result"
            },
            {
                key: "3rdQ",
                value: 5,
                type: "result"
            },
            {
                key: "4thQ",
                value: 6,
                type: "result"
            }
        ],
        12: [
            {
                key: "time",
                value: null,
                type: "header"
            },
            {
                key: "MATCH",
                value: null,
                type: "header"
            },
            {
                key: "match",
                value: 0,
                type: "result"
            },
            {
                key: "map1",
                value: 1,
                type: "result"
            },
            {
                key: "map2",
                value: 2,
                type: "result"
            },
            {
                key: "map3",
                value: 3,
                type: "result"
            },
            {
                key: "map4",
                value: 4,
                type: "result"
            },
            {
                key: "map5",
                value: 5,
                type: "result"
            }
        ],
        33: [
            {
                key: "time",
                value: null,
                type: "header"
            },
            {
                key: "MATCH",
                value: null,
                type: "header"
            },
            {
                key: "ft",
                value: 0,
                type: "result"
            },
            {
                key: "1stS",
                value: 1,
                type: "result"
            },
            {
                key: "2ndS",
                value: 2,
                type: "result"
            },
            {
                key: "3rdS",
                value: 3,
                type: "result"
            },
            {
                key: "4thS",
                value: 4,
                type: "result"
            },
            {
                key: "5thS",
                value: 5,
                type: "result"
            }
        ],
        3: [
            {
                key: "time",
                value: null,
                width: "140px",
                type: "header"
            },
            {
                key: "MATCH",
                value: null,
                type: "header"
            },
            {
                key: "ft",
                value: 0,
                width: "80px",
                type: "result"
            },
            {
                key: "1stH",
                value: 1,
                width: "80px",
                type: "result"
            },
            {
                key: "1stInn",
                value: 10,
                width: "80px",
                type: "result"
            }
        ],
        15: [
            {
                key: "time",
                value: null,
                width: "140px",
                type: "header"
            },
            {
                key: "MATCH",
                value: null,
                type: "header"
            },
            {
                key: "ft",
                value: 0,
                width: "80px",
                type: "result"
            },
            {
                key: "1stH",
                value: 1,
                width: "80px",
                type: "result"
            },
            {
                key: "1stH",
                value: 2,
                width: "80px",
                type: "result"
            }
        ],
        34: [
            {
                key: "time",
                value: null,
                width: "140px",
                type: "header"
            },
            {
                key: "MATCH",
                value: null,
                type: "header"
            },
            {
                key: "ft",
                value: 0,
                width: "80px",
                type: "result"
            },
            {
                key: "1stS",
                value: 1,
                width: "80px",
                type: "result"
            },
            {
                key: "2ndS",
                value: 2,
                width: "80px",
                type: "result"
            },
            {
                key: "3rdS",
                value: 3,
                width: "80px",
                type: "result"
            },
            {
                key: "4thS",
                value: 4,
                width: "80px",
                type: "result"
            },
            {
                key: "5thS",
                value: 5,
                width: "80px",
                type: "result"
            }
        ],
        1: [
            {
                key: "time",
                value: null,
                width: "140px",
                type: "header"
            },
            {
                key: "MATCH",
                value: null,
                type: "header"
            },
            {
                key: "ft",
                value: 0,
                width: "80px",
                type: "result"
            },
            {
                key: "1stH",
                value: 1,
                width: "80px",
                type: "result"
            },
            {
                key: "2ndH",
                value: 2,
                width: "80px",
                type: "result"
            }
        ]
    },
    sortResult: [
        {
            value: "normal"
        },
        { value: "time" }
    ],
    refreshTimeMyBet: 120,
    refreshTimePendingBet: 5,
    mutiLang: {
        enGB: {
            name: "English",
            icon: "icon-flag icon-flag-enGB",
            img: "/images/flag_enGB_large.png"
        },
        // viVN: {
        //     name: 'Tiếng Việt',
        //     icon: 'icon-flag icon-flag-viVN',
        //     img: '/images/flag_viVN_large.png'
        // },
        zhCN: {
            name: "简体中文",
            icon: "icon-flag icon-flag-zhCN",
            img: "/images/flag_zhCN_large.png"
        },
        inIn: {
            name: "Indonesia",
            icon: "icon-flag icon-flag-zhCN",
            img: "/images/flag_zhCN_large.png"
        }
    },
    selectLine: [
        {
            value: 1,
            name: "1 Line"
        },
        {
            value: 3,
            name: "3 Lines"
        },
        {
            value: 5,
            name: "5 Lines"
        },
        {
            value: null,
            name: "",
            className: "hr"
        },
        {
            value: "all",
            name: "All markets"
        }
    ],
    selectSort: {
        normal: {
            name: "Normal Sorting",
            icon: "icon icon-sort"
        },
        byTime: {
            name: "Sort by Time",
            icon: "icon icon-sort-time"
        }
    },
    selectOdds: {
        // 0: {
        //     name: 'American Odds',
        //     icon: 'icon icon-currency-AM'
        // },
        // 1: {
        //     name: 'Malay Odds',
        //     icon: 'icon icon-currency-MY'
        // },
        2: {
            name: "Euro Odds",
            icon: "icon icon-currency-ER"
        },
        3: {
            name: "Indo Odds",
            icon: "icon icon-currency-IN"
        }
        // {
        //     value: 3,
        //     name: 'Hong Kong Odds',
        //     icon: 'icon-currency icon-currency-AM'
        // }
    },
    numberMatchView: 35,
    selectPeriods: {
        29: [
            {
                value: [0, 2],
                key: "match",
                index: 0
            },
            {
                value: [1, 2],
                key: "1stHalf",
                index: 1
            },
            {
                value: [2, 3],
                key: "2ndHalf",
                index: 2
            }
        ],
        33: [
            {
                value: [0, 2],
                key: "match",
                index: 0
            }
        ],
        4: [
            {
                value: [0, 2],
                key: "match",
                index: 0
            },
            {
                value: [1, 2],
                key: "1stHalf",
                index: 1
            },
            {
                value: [2, 3],
                key: "2ndHalf",
                index: 2
            },
            {
                value: [3, 4],
                key: "1stQuanter",
                index: 3
            },
            {
                value: [4, 5],
                key: "2ndQuanter",
                index: 4
            },
            {
                value: [5, 6],
                key: "3rdQuanter",
                index: 5
            },
            {
                value: [6, 7],
                key: "4thQuanter",
                index: 6
            }
        ],
        12: [
            {
                value: [0, 2],
                key: "match",
                index: 0
            },
            {
                value: [1, 2],
                key: "map1",
                index: 1
            },
            {
                value: [2, 3],
                key: "map2",
                index: 2
            },
            {
                value: [3, 4],
                key: "map3",
                index: 3
            },
            {
                value: [4, 5],
                key: "map4",
                index: 4
            },
            {
                value: [5, 6],
                key: "map5",
                index: 5
            }
        ]
    },
    selectBuySellLevels: [
        {
            value: 1,
            key: "1Line"
        },
        {
            value: 3,
            key: "3Line"
        },
        {
            value: 5,
            key: "5Line"
        },
        {
            value: "all",
            key: "all"
        }
    ],
    selectOddsEntry: [
        // {
        //         value: 1,
        //         icon: 'icon-currency icon-currency-MY',
        //         key: 'malaysia'
        //     },
        {
            value: 0,
            key: "american",
            icon: "icon-currency icon-currency-AM"
        },
        {
            value: 2,
            key: "decimal",
            icon: "icon-currency icon-currency-ER"
        }
        // {
        //     value: 3,
        //     key: 'hongkong'
        // }
    ],
    sortLeague: {
        29: {
            //soccer
            level1: [
                {
                    key: "UEFA",
                    value: 0
                },
                {
                    key: "International",
                    value: 1
                },
                {
                    key: "England",
                    value: 2
                },
                {
                    key: "Italy",
                    value: 2
                },
                {
                    key: "Spain",
                    value: 2
                },
                {
                    key: "Germany",
                    value: 2
                },
                {
                    key: "France",
                    value: 2
                }
            ],
            level2: [
                {
                    key: "Champions League",
                    value: 0
                },
                {
                    key: "Europa League",
                    value: 1
                },
                {
                    key: "Friendlies",
                    value: 2
                },
                {
                    key: "Premier League",
                    value: 2
                },
                {
                    key: "Serie A",
                    value: 3
                },
                {
                    key: "La Liga",
                    value: 4
                },
                {
                    key: "Bundesliga",
                    value: 5
                },
                {
                    key: "Ligue 1",
                    value: 6
                },
                {
                    key: "FA Cup",
                    value: 7
                },
                {
                    key: "Cup",
                    value: 8
                },
                {
                    key: "Championship",
                    value: 9
                },
                {
                    key: "Bundesliga 2",
                    value: 10
                }
            ]
        },
        4: {
            //basketball
            level1: [
                {
                    key: "NBA",
                    value: 0
                },
                {
                    key: "Europe",
                    value: 1
                },
                {
                    key: "WNBA",
                    value: 1
                },
                {
                    key: "Italy",
                    value: 1
                },
                {
                    key: "Spain",
                    value: 1
                },
                {
                    key: "Poland",
                    value: 1
                },
                {
                    key: "World",
                    value: 1
                },
                {
                    key: "France",
                    value: 1
                }
            ],
            level2: [
                {
                    key: "Euroleague",
                    value: 0
                },
                {
                    key: "WNBA",
                    value: 1
                },
                {
                    key: "Lega A",
                    value: 2
                },
                {
                    key: "LEB Gold",
                    value: 3
                },
                {
                    key: "Tauron Basket Liga",
                    value: 4
                },
                {
                    key: " Lega Nazionale Pallacanestro Gold",
                    value: 5
                },
                {
                    key: "International Friendlies Women",
                    value: 6
                },
                {
                    key: "Championnat Pro B",
                    value: 7
                }
            ]
        },
        33: {
            level1: [
                {
                    key: "ATP Challenger Bordeaux",
                    value: 0
                },
                {
                    key: "ATP Challenger Heilbronn",
                    value: 1
                },
                {
                    key: "ATP Rome",
                    value: 2
                },
                {
                    key: "ITF Women Bastad",
                    value: 3
                },
                {
                    key: "ITF Women La Bisbal",
                    value: 4
                },
                {
                    key: "ITF Women Naples",
                    value: 5
                },
                {
                    key: "ITF Women Saint Gaudens",
                    value: 6
                },
                {
                    key: "WTA Rome",
                    value: 7
                },
                {
                    key: "WTA Strasbourg",
                    value: 8
                }
            ],
            level2: [
                {
                    key: "QF",
                    value: 0
                },
                {
                    key: "R16",
                    value: 1
                },
                {
                    key: "Doubles",
                    value: 2
                },
                {
                    key: "SF",
                    value: 3
                },
                {
                    key: " Qualifiers",
                    value: 4
                }
            ]
        },
        12: {
            level1: [
                {
                    key: "CS:GO",
                    value: 0
                },
                {
                    key: "Dota 2",
                    value: 1
                },
                {
                    key: "Heroes of the Storm",
                    value: 2
                },
                {
                    key: "League of Legends",
                    value: 3
                },
                {
                    key: "Overwatch",
                    value: 4
                }
            ],
            level2: [
                {
                    key: "AdriaMasters",
                    value: 0
                },
                {
                    key: "Binary Dragons Cup",
                    value: 1
                },
                {
                    key: "ESL South East Europe",
                    value: 2
                },
                {
                    key: "Minor Championship",
                    value: 3
                },
                {
                    key: "Showmatch",
                    value: 4
                },
                {
                    key: "Dreamleague",
                    value: 0
                },
                {
                    key: "LootBet Cup",
                    value: 1
                },
                {
                    key: "Prodota Cup",
                    value: 2
                },
                {
                    key: "SL I-League StarSeries",
                    value: 3
                },
                {
                    key: "World Cyber Arena",
                    value: 4
                },
                {
                    key: "Global Championship",
                    value: 0
                },
                {
                    key: "Mid-Season Invitational",
                    value: 0
                },
                {
                    key: "OGN Overwatch APEX",
                    value: 0
                },
                {
                    key: "Pacific Championship",
                    value: 1
                }
            ]
        }
    },
    mapSideToTeam: {
        0: "Team1",
        1: "Team2",
        2: "Over",
        3: "Under",
        4: "Team1",
        5: "Team2",
        6: "Draw",
        7: "Team2",
        8: "Odd",
        9: "Even",
        11: "0~1",
        12: "2~3",
        13: "4~6",
        14: "7 & Over",
        10: "Team1",
        15: "1X",
        16: "2X",
        17: "12",
        18: "AOS",
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
        44: "HF",
        45: "HL",
        46: "AF",
        47: "AL",
        48: "No Goal",
        49: "HH",
        50: "HD",
        51: "HA",
        52: "DH",
        53: "DD",
        54: "DA",
        55: "AH",
        56: "AD",
        57: "AA"
    },
    mapSideToPeriod: {
        0: "Handicap",
        1: "Handicap",
        2: "Over/Under",
        3: "Over/Under",
        4: "1X2",
        5: "1X2",
        6: "1X2",
        8: "Odd/Even",
        9: "Odd/Even",
        10: "Outright",
        11: "Total Goal",
        12: "Total Goal",
        13: "Total Goal",
        14: "Total Goal",
        15: "Double Chance",
        16: "Double Chance",
        17: "Double Chance",
        18: "Correct Score",
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
        44: "First Goal/Last Goal",
        45: "First Goal/Last Goal",
        46: "First Goal/Last Goal",
        47: "First Goal/Last Goal",
        48: "First Goal/Last Goal",
        49: "HT/FT",
        50: "HT/FT",
        51: "HT/FT",
        52: "HT/FT",
        53: "HT/FT",
        54: "HT/FT",
        55: "HT/FT",
        56: "HT/FT",
        57: "HT/FT"
    },
    mapMarketToTitle: {
        0: "FT",
        1: "1st Half",
        10: "Outright",
        11: "First Goal/Last Goal"
    }
};
sportConfig.function = {
    customViewTeam: function(team, lengthCut) {
        let result = team;
        if (team) {
            if (team.length > lengthCut) {
                result = team.substring(0, lengthCut) + "...";
            }
        } else {
            result = "";
        }
        return result;
    },
    pad: function(str, max) {
        function pad(str, max) {
            str = str.toString();
            return str.length < max ? pad("0" + str, max) : str;
        }
        return pad(str, max);
    },
    _formatMoney(num) {
        // if (!_.isNaN(num)) {
        //     num = Math.round(num * 100) / 100
        //     let p = num.toFixed(2).split(".")
        //     return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        //         return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc
        //     }, "") + "." + p[1]
        // }
        // return '0.00'
        if (num && !_.isNaN(num)) {
            let p = num.toString().split(".");
            return p[0]
                .split("")
                .reverse()
                .reduce(function(acc, num, i, orig) {
                    return num == "-"
                        ? acc
                        : num + (i && !(i % 3) ? "," : "") + acc;
                }, "");
        }
        return "0";
    },
    _formatGold(num) {
        if (!_.isNaN(num)) {
            num = Math.round(num * 100) / 100;
            let p = num.toFixed(1).split(".");
            return (
                p[0]
                    .split("")
                    .reverse()
                    .reduce(function(acc, num, i, orig) {
                        return num == "-"
                            ? acc
                            : num + (i && !(i % 3) ? "," : "") + acc;
                    }, "") + (p[1] != "0" ? "." + p[1] : "")
            );
        }
        return "";
        // if (num && !_.isNaN(num)) {
        //     let p = (num.toString()).split(".")
        //     return p[0].split("").reverse().reduce(function (acc, num, i, orig) {
        //         return num == "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc
        //     }, "")
        // }
        // return '0'
    },
    _formatNumber(num) {
        if (num && !_.isNaN(num)) {
            let p = num.toString().split(".");
            return p[0]
                .split("")
                .reverse()
                .reduce(function(acc, num, i, orig) {
                    return num == "-"
                        ? acc
                        : num + (i && !(i % 3) ? "," : "") + acc;
                }, "");
        }
        return "0";
    },
    _formatDollar(num) {
        var p = num.toFixed(2).split(".");
        return p[0]
            .split("")
            .reverse()
            .reduce(function(acc, num, i, orig) {
                return num == "-"
                    ? acc
                    : num + (i && !(i % 3) ? "," : "") + acc;
            }, "");
    },
    _parseOddsArray: [
        [
            function(value) {
                return value;
            }, //0-0
            function(value) {
                //0-1: american-malay
                return -100 / value;
            },
            function(value) {
                //0-2: american-decimal
                switch (true) {
                    case value >= 0:
                        return value / 100 + 1;
                    case value < 0:
                        return -100 / value + 1;
                    default:
                        return value;
                }
            },
            function(value) {
                //0-3: american-indo
                switch (true) {
                    case value >= 0:
                        return value / 100;
                    case value < 0:
                        return value / 100;
                    default:
                        return value;
                }
            }
        ],
        [
            function(value) {
                //1-0: malay-american
                return -100 / value;
            },
            function(value) {
                //1-1: malay-malay
                return value;
            },
            function(value) {
                //1-2 malay-decimal
                let result = 0;
                if (value > 0) {
                    result = value + 1;
                } else {
                    result = -1 / value + 1;
                }
                return result;
            },
            function(value) {
                return -1 / value;
            },
            function(value) {
                let result = 0;
                if (value > 0) {
                    result = value;
                } else {
                    result = -1 / value;
                }
                return result;
            }
        ],
        [
            function(value) {
                //2-0: decimal-american
                switch (true) {
                    case value >= 2:
                        return (value - 1) * 100;
                    case value < 2:
                        return -100 / (value - 1);
                    default:
                        return "";
                }
            },
            function(value) {
                //2-1: decimal-malay
                let result = null;
                if (value >= 2) {
                    result = value - 1;
                } else {
                    result = -1 / (value - 1);
                }
                return result;
            },
            function(value) {
                //2-2: decimal-decial
                return value;
            },
            function(value) {
                //2-3: decimal-indo
                let result = null;
                if (value >= 2) {
                    result = new Decimal(value).minus(1); //value -1
                } else {
                    result = new Decimal(-1).dividedBy(
                        new Decimal(value).minus(1)
                    ); //-1 / (value - 1)
                }
                return result;
            },
            function(value) {
                //2-3: decimal-hongkong
                return value - 1;
            }
        ],
        [
            function(value) {
                //3-0: indo-american
                switch (true) {
                    case value >= 1:
                        return value * 100;
                    case value < 1:
                        return value * 100;
                }
            },
            function(value) {
                //3-1 indo-malay
                return -1 / value;
            },
            function(value) {
                //3-2 indo-decimal
                let result = 0;
                if (value > 0) {
                    result = value + 1;
                } else {
                    result = -1 / value + 1;
                }
                return result;
            },
            function(value) {
                //3-3 indo-indo
                return value;
            },
            function(value) {
                //3-4 indo-hongkong
                let result = 0;
                if (value > 0) {
                    result = value;
                } else {
                    result = -1 / value;
                }
                return result;
            }
        ]
    ],
    _calculatorMaxPayout: [
        //american - 0
        function(betMoney, odds) {
            betMoney = parseFloat(betMoney);
            odds = parseFloat(odds); //.toFixed(2)
            let result = 0;
            if (odds < 0) {
                result = (odds / -100) * betMoney + betMoney;
            } else {
                result = (odds / 100) * betMoney + betMoney;
            }
            return result;
        },
        //malaysia - 1
        function(betMoney, odds, side) {
            betMoney = parseFloat(betMoney);
            odds = parseFloat(odds); //.toFixed(2)
            switch (side) {
                case 4:
                case 5:
                case 6:
                case 15:
                case 16:
                case 17:
                    return betMoney * odds;
                    break;
                default:
                    if (odds > 0) return betMoney * odds + betMoney;
                    return betMoney * odds * -1 + betMoney;
                    break;
            }
        },
        //decimal - 2
        function(betMoney, odds) {
            betMoney = parseFloat(betMoney);
            odds = parseFloat(odds);
            let result = new Decimal(betMoney).times(odds); //parseFloat((betMoney * odds).toPrecision(12))
            return result;
        },
        //indo - 3
        function(betMoney, odds, side) {
            betMoney = new Decimal(betMoney); //parseFloat((betMoney))
            odds = new Decimal(odds); //parseFloat((odds))
            switch (true) {
                case _.indexOf(sportConfig.sideEU, side) != -1:
                    //betMoney = new Decimal(betMoney)//parseFloat((betMoney).toPrecision(12))
                    //odds = new Decimal(odds) //parseFloat((odds).toPrecision(12))
                    // return (betMoney * odds)
                    return betMoney.times(odds); //parseFloat((betMoney * odds).toPrecision(12))
                    break;

                case 17:
                    return betMoney.times(odds); //parseFloat((betMoney * odds).toPrecision(12))
                    break;
                default:
                    if (odds > 0) {
                        return betMoney.times(odds).plus(betMoney);
                    } else {
                        return betMoney.times(odds.times(-1)).plus(betMoney);
                    }
            }
        }
    ],
    _calculatorRiskBet: [
        //american - 0
        function(betMoney, odds) {
            betMoney = new Decimal(betMoney); //parseFloat(betMoney)
            odds = new Decimal(odds); //parseFloat(odds) //.toFixed(2)
            let result = 0;
            if (odds < 0) {
                result = odds.dividedBy(-100).times(betMoney); //((odds / -100) * betMoney) //.toFixed(2)
            } else {
                result = betMoney;
            }
            return result;
        },
        //malaysia - 1
        function(betMoney, odds, side) {
            betMoney = parseFloat(betMoney);
            odds = parseFloat(odds); //.toFixed(2)
            switch (side) {
                case 4:
                case 5:
                case 6:
                case 15:
                case 16:
                case 17:
                    return betMoney;
                    break;
                default:
                    if (odds > 0) return betMoney;
                    else {
                        return betMoney * odds * -1; //.toFixed(2)
                    }
                    break;
            }
        },
        //decimal - 2
        function(betMoney, odds) {
            betMoney = new Decimal(betMoney);
            return betMoney;
        },
        //indo - 3
        function(betMoney, odds) {
            betMoney = new Decimal(betMoney);
            odds = new Decimal(odds);
            if (odds > 0) {
                return betMoney;
            }
            return odds.times(-1).times(betMoney); //parseFloat((-odds * betMoney).toPrecision(12))
        }
    ],
    _calculatorWinbet: [
        //american - 0
        function(betMoney, odds) {
            betMoney = parseFloat(betMoney);
            odds = parseFloat(odds);
            let result = 0;
            if (odds < 0) {
                result = (odds / -100) * betMoney;
            } else {
                result = (odds / 100) * betMoney;
            }
            return parseFloat(result).toPrecision(12);
        },
        //malaysia - 1
        function(betMoney, odds) {
            betMoney = parseFloat(betMoney);
            odds = parseFloat(odds);
            let result = 0;
            if (odds < 0) {
                result = betMoney;
            } else {
                result = odds * betMoney;
            }
            return parseFloat(result).toPrecision(12);
        },
        //decimal - 2,
        function(betMoney, odds) {
            betMoney = new Decimal(betMoney);
            odds = new Decimal(odds);
            const result = odds.minus(1).times(betMoney); //(odds - 1) * betMoney
            return result;
        },
        //indo
        function(betMoney, odds) {
            betMoney = new Decimal(betMoney);
            odds = new Decimal(odds);
            if (odds > 0) {
                return odds.times(betMoney); //parseFloat(odds * betMoney).toPrecision(12)
            } else {
                return betMoney; //parseFloat(betMoney).toPrecision(12)
            }
        }
    ],
    _base64: {
        _keyStr:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(input) {
            let output = "";
            let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            let i = 0;
            input = this._utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output =
                    output +
                    this._keyStr.charAt(enc1) +
                    this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) +
                    this._keyStr.charAt(enc4);
            }
            return output;
        },
        decode: function(input) {
            let output = "";
            let chr1, chr2, chr3;
            let enc1, enc2, enc3, enc4;
            let i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = this._utf8_decode(output);
            return output;
        },
        _utf8_encode: function(string) {
            string = string.replace(/\r\n/g, "\n");
            let utftext = "";
            for (let n = 0; n < string.length; n++) {
                let c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if (c > 127 && c < 2048) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        },
        _utf8_decode: function(utftext) {
            let string = "";
            let i = 0;
            let c = 0;
            let c1 = 0;
            let c2 = 0;
            let c3 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if (c > 191 && c < 224) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(
                        ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
                    );
                    i += 3;
                }
            }
            return string;
        }
    },
    countEvent({ market, listToday, listLive, listEarly, eventCount, sport }) {
        function _countEvent({ market, listLive, listToday, listEarly }) {
            let maxLengthList = 0;
            let listMap = {};
            const objLength = {
                0: 0,
                1: 0,
                2: 0
            };
            switch (market) {
                case 0:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1, 0].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").map((match, iM) => {
                                if (
                                    match.getIn(["Periods", 0, 0]) == 0 ||
                                    match.getIn(["Periods", 1, 0]) == 1
                                ) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
                case 1:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").map((match, iM) => {
                                if (
                                    match.getIn(["Periods", 0, 0]) == 0 ||
                                    match.getIn(["Periods", 1, 0]) == 1
                                ) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
                case 2:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [2].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").forEach((match, iM) => {
                                if (
                                    match.getIn(["Periods", 0, 0]) == 0 ||
                                    match.getIn(["Periods", 1, 0]) == 1
                                ) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
                case 3:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1, 0, 2].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").forEach((match, iM) => {
                                if (
                                    match.getIn(["Periods", 0, 0]) == 0 ||
                                    match.getIn(["Periods", 1, 0]) == 1
                                ) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
                case 4:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1, 0, 2].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            objLength[key]++;
                        });
                    });
                    break;
                case 5:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1, 0, 2].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").forEach((match, iM) => {
                                const objPer = _.find(
                                    match.get("Periods").toJS(),
                                    function(ft) {
                                        return ft && ft[0] == 0;
                                    }
                                );
                                const objOETG = _.find(objPer, function(ft) {
                                    return ft && (ft[0] == 8 || ft[0] == 11);
                                });
                                if (objOETG) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
                case 6:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1, 0, 2].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").forEach((match, iM) => {
                                const objPer = _.find(
                                    match.get("Periods").toJS(),
                                    function(ft) {
                                        return ft && ft[0] == 0;
                                    }
                                );
                                const objFTFHCS = _.find(objPer, function(ft) {
                                    return ft && ft[0] == 18;
                                });
                                if (objFTFHCS) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
                case 7:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1, 0, 2].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").forEach((match, iM) => {
                                if (
                                    match.getIn(["Periods", 0, 0]) == 0 ||
                                    match.getIn(["Periods", 1, 0]) == 1
                                ) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
                case 8:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1, 0, 2].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").forEach((match, iM) => {
                                const objHTFT = _.find(
                                    match.get("Periods").toJS(),
                                    function(ft) {
                                        return ft && ft[0] == 12;
                                    }
                                );
                                if (objHTFT) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
                case 9:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1, 0, 2].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").forEach((match, iM) => {
                                const objPer = _.find(
                                    match.get("Periods").toJS(),
                                    function(ft) {
                                        return ft && ft[0] == 11;
                                    }
                                );
                                const objFTFHCS = _.find(objPer, function(ft) {
                                    return ft && ft[0] == 44;
                                });
                                if (objFTFHCS) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
                default:
                    listMap = { 1: listLive, 0: listToday, 2: listEarly };
                    [1, 0, 2].map((key, iK) => {
                        listMap[key].map((league, iL) => {
                            league.get("Matches").forEach((match, iM) => {
                                if (
                                    match.getIn(["Periods", 0, 0]) == 0 ||
                                    match.getIn(["Periods", 1, 0]) == 1
                                ) {
                                    objLength[key]++;
                                }
                            });
                        });
                    });
                    break;
            }
            return objLength;
        }
        switch (market) {
            case 0:
                //update for today
                const eventToday = _countEvent({
                    market: 0,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][0] &&
                    eventCount[sport][0]
                ) {
                    eventCount[sport][0][0] = eventToday[0];
                    eventCount[sport][0][1] = eventToday[1];
                }
                break;
            case 1:
                //update for live
                const eventLive = _countEvent({
                    market: 1,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][0] &&
                    eventCount[sport][0]
                ) {
                    eventCount[sport][0][1] = eventLive[1];
                }
                break;
            case 2:
                //update for early
                const eventEarly = _countEvent({
                    market: 2,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][0] &&
                    eventCount[sport][0]
                ) {
                    eventCount[sport][0][2] = eventEarly[2];
                }
                break;
            case 3:
                //update money line
                const eventMoneyLine = _countEvent({
                    market: 3,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][4] &&
                    eventCount[sport][4]
                ) {
                    eventCount[sport][4] = eventMoneyLine;
                }
                break;
            case 4:
                //update for outright
                const eventOutright = _countEvent({
                    market: 4,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][2] &&
                    eventCount[sport][2]
                ) {
                    eventCount[sport][2] = eventOutright;
                }
                break;
            case 5:
                //update for OETG
                const eventOETG = _countEvent({
                    market: 5,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][3] &&
                    eventCount[sport][3]
                ) {
                    eventCount[sport][3] = eventOETG;
                }
                break;
            case 6:
                //update for FTFHCS
                const eventFTFHCS = _countEvent({
                    market: 6,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][5] &&
                    eventCount[sport][5]
                ) {
                    eventCount[sport][5] = eventFTFHCS;
                }
                break;
            case 7:
                //update for parlay
                const eventParlay = _countEvent({
                    market: 7,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][1] &&
                    eventCount[sport][1]
                ) {
                    eventCount[sport][1] = eventParlay;
                }
                break;
            case 8:
                //update for HT FT
                const eventHTFT = _countEvent({
                    market: 8,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][6] &&
                    eventCount[sport][6]
                ) {
                    eventCount[sport][6] = eventHTFT;
                }
                break;
            case 9:
                //update for FG LG
                const eventFGLG = _countEvent({
                    market: 9,
                    listLive: listLive,
                    listToday: listToday,
                    listEarly: listEarly
                });
                if (
                    eventCount &&
                    eventCount[sport] &&
                    eventCount[sport][7] &&
                    eventCount[sport][7]
                ) {
                    eventCount[sport][7] = eventFGLG;
                }
                break;
            default:
                break;
        }
        return eventCount;
    },
    _roundSBO(num, n) {
        if (num) {
            return Math.round(num * 100) / 100;
        } else {
            return num;
        }
        return num;
    },
    _subDecimal(num, n = 2) {
        if (num) {
            if (num.toString().indexOf(".") != -1) {
                let inte = num
                    .toString()
                    .substr(0, num.toString().indexOf("."));
                let deci = num
                    .toString()
                    .substr(num.toString().indexOf(".") + 1, n);
                return inte + "." + deci;
            } else {
                return num;
            }
        } else {
            return num;
        }
        return num;
    }
};
sportConfig.function.roundOdds = function(odds) {
    let finalOdds = null,
        oriOdds = null,
        subOdds = null;
    if (odds) {
        oriOdds = odds;
        subOdds = parseFloat(
            oriOdds.toString().substring(0, oriOdds > 0 ? 5 : 6)
        );
        if (oriOdds == subOdds) {
            finalOdds = oriOdds.toFixed(2);
        } else {
            if (oriOdds < 0) {
                finalOdds = (subOdds - 0.01).toFixed(2);
            } else {
                finalOdds = subOdds.toFixed(2);
            }
        }
    }
    return finalOdds;
};
sportConfig.function._parseOddsEntry = function(objOdds, oddsEntry, notRound) {
    let temp = null;
    switch (true) {
        //same odds
        case objOdds.type == oddsEntry:
            return objOdds.value;
        //another odds
        case objOdds.type != oddsEntry:
            switch (true) {
                case objOdds.type == null:
                    return null;
                //default odds - parse Amecican to --> oddsEntry
                case objOdds.type != 0 &&
                    typeof sportConfig.function._parseOddsArray[objOdds.type][
                        oddsEntry
                    ] != "function":
                    temp = sportConfig.function._parseOddsArray[0][oddsEntry](
                        sportConfig.function._parseOddsArray[objOdds.type][0](
                            objOdds.value
                        )
                    );
                    return notRound == true
                        ? temp
                        : sportConfig.function.roundOdds(temp);
                case objOdds.type != 0 &&
                    typeof sportConfig.function._parseOddsArray[objOdds.type][
                        oddsEntry
                    ] == "function":
                    temp = sportConfig.function._parseOddsArray[objOdds.type][
                        oddsEntry
                    ](objOdds.value);
                    return sportConfig.function.roundOdds(temp);
                case objOdds.type == 0:
                    //parse value objOdds --> American --> oddsEntry
                    temp = sportConfig.function._parseOddsArray[objOdds.type][
                        oddsEntry
                    ](objOdds.value);
                    return notRound == true
                        ? temp
                        : sportConfig.function.roundOdds(temp);
            }
    }
};
sportConfig._setCookie = function(key, value, timeSet) {
    let timeDefault = 1000 * 60 * 24 * 30 * 365;
    let timeEp = timeSet ? timeSet : timeDefault;
    let expires = new Date();
    expires.setTime(expires.getTime() + timeEp);
    document.cookie =
        key +
        "=" +
        encodeURIComponent(value) +
        ";expires=" +
        expires.toUTCString() +
        ";path=/";
};

sportConfig._getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
};
sportConfig._removeCookie = function(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
sportConfig._getSubdomain = function(h) {
    var parts = h.split(".");
    if (parts.length == 2) return "www";
    return parts[0];
};
sportConfig.sportHeaders = {
    29: {
        0: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '40px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        7: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '60px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        1: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '60px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        2: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        4: [
            {
                0: {
                    value: "contest",
                    colSpan: 8,
                    rowSpan: "",
                    className: "text-center margin-left-20",
                    type: "header"
                },
                1: {
                    value: "odds",
                    colSpan: "",
                    rowSpan: "",
                    width: "100px",
                    className: "",
                    type: "header"
                }
            }
        ],
        3: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "Double Chance",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                4: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                5: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "1X",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                7: {
                    value: "12",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                8: {
                    value: "X2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
            }
        ],
        5: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "Odd",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Even",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "0~1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "2~3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "4~6",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "7 & Over",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        6: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "1:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "2:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "2:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "3:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "3:1",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "3:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                8: {
                    value: "4:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                9: {
                    value: "4:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                10: {
                    value: "4:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                11: {
                    value: "4:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                12: {
                    value: "0:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                13: {
                    value: "1:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                14: {
                    value: "2:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                15: {
                    value: "3:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                16: {
                    value: "4:4",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                17: {
                    value: "AOS",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        8: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "HH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                3: {
                    value: "HD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                4: {
                    value: "HA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                5: {
                    value: "DH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                6: {
                    value: "DD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                7: {
                    value: "DA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                8: {
                    value: "AH",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                9: {
                    value: "AD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                10: {
                    value: "AA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                }
            }
        ],
        9: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "First Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Last Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "No Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ]
    },
    1: {
        0: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        7: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        1: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        2: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        4: [
            {
                0: {
                    value: "contest",
                    colSpan: 8,
                    rowSpan: "",
                    className: "text-center margin-left-20",
                    type: "header"
                },
                1: {
                    value: "odds",
                    colSpan: "",
                    rowSpan: "",
                    width: "100px",
                    className: "",
                    type: "header"
                }
            }
        ],
        3: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "Double Chance",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                4: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                5: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "1X",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                7: {
                    value: "12",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                8: {
                    value: "X2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
            }
        ],
        5: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "Odd",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Even",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "0~1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "2~3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "4~6",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "7 & Over",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        6: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "1:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "2:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "2:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "3:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "3:1",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "3:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                8: {
                    value: "4:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                9: {
                    value: "4:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                10: {
                    value: "4:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                11: {
                    value: "4:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                12: {
                    value: "0:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                13: {
                    value: "1:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                14: {
                    value: "2:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                15: {
                    value: "3:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                16: {
                    value: "4:4",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                17: {
                    value: "AOS",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        8: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "HH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                3: {
                    value: "HD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                4: {
                    value: "HA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                5: {
                    value: "DH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                6: {
                    value: "DD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                7: {
                    value: "DA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                8: {
                    value: "AH",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                9: {
                    value: "AD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                10: {
                    value: "AA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                }
            }
        ],
        9: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "First Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Last Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "No Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ]
    },
    4: {
        0: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        7: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        1: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        2: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        4: [
            {
                0: {
                    value: "contest",
                    colSpan: 8,
                    rowSpan: "",
                    className: "text-center margin-left-20",
                    type: "header"
                },
                1: {
                    value: "odds",
                    colSpan: "",
                    rowSpan: "",
                    width: "100px",
                    className: "",
                    type: "header"
                }
            }
        ],
        3: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "Double Chance",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                4: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                5: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "1X",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                7: {
                    value: "12",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                8: {
                    value: "X2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
            }
        ],
        5: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "Odd",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Even",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "0~1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "2~3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "4~6",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "7 & Over",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        6: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 1,
                    width: "200px",
                    className: "",
                    type: "header"
                },
                2: {
                    value: "1:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "2:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "2:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "3:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "3:1",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "3:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                8: {
                    value: "4:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                9: {
                    value: "4:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                10: {
                    value: "4:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                11: {
                    value: "4:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                12: {
                    value: "0:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                13: {
                    value: "1:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                14: {
                    value: "2:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                15: {
                    value: "3:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                16: {
                    value: "4:4",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                17: {
                    value: "AOS",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        8: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "HH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                3: {
                    value: "HD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                4: {
                    value: "HA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                5: {
                    value: "DH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                6: {
                    value: "DD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                7: {
                    value: "DA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                8: {
                    value: "AH",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                9: {
                    value: "AD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                10: {
                    value: "AA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                }
            }
        ],
        9: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    width: "200px",
                    className: "",
                    type: "header"
                },
                2: {
                    value: "First Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Last Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "No Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ]
    },
    12: {
        0: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        7: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        1: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        2: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        4: [
            {
                0: {
                    value: "contest",
                    colSpan: 8,
                    rowSpan: "",
                    className: "text-center margin-left-20",
                    type: "header"
                },
                1: {
                    value: "odds",
                    colSpan: "",
                    rowSpan: "",
                    width: "100px",
                    className: "",
                    type: "header"
                }
            }
        ],
        3: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "Double Chance",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                4: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                5: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "1X",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                7: {
                    value: "12",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                8: {
                    value: "X2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
            }
        ],
        5: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "Odd",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Even",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "0~1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "2~3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "4~6",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "7 & Over",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        6: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "1:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "2:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "2:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "3:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "3:1",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "3:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                8: {
                    value: "4:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                9: {
                    value: "4:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                10: {
                    value: "4:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                11: {
                    value: "4:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                12: {
                    value: "0:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                13: {
                    value: "1:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                14: {
                    value: "2:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                15: {
                    value: "3:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                16: {
                    value: "4:4",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                17: {
                    value: "AOS",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        8: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "HH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                3: {
                    value: "HD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                4: {
                    value: "HA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                5: {
                    value: "DH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                6: {
                    value: "DD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                7: {
                    value: "DA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                8: {
                    value: "AH",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                9: {
                    value: "AD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                10: {
                    value: "AA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                }
            }
        ],
        9: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "First Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Last Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "No Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ]
    },
    33: {
        0: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        7: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        1: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        2: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        4: [
            {
                0: {
                    value: "contest",
                    colSpan: 8,
                    rowSpan: "",
                    className: "text-center margin-left-20",
                    type: "header"
                },
                1: {
                    value: "odds",
                    colSpan: "",
                    rowSpan: "",
                    width: "100px",
                    className: "",
                    type: "header"
                }
            }
        ],
        3: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "Double Chance",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                4: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                5: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "1X",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                7: {
                    value: "12",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                8: {
                    value: "X2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
            }
        ],
        5: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "Odd",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Even",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "0~1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "2~3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "4~6",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "7 & Over",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        6: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "1:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "2:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "2:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "3:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "3:1",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "3:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                8: {
                    value: "4:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                9: {
                    value: "4:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                10: {
                    value: "4:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                11: {
                    value: "4:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                12: {
                    value: "0:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                13: {
                    value: "1:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                14: {
                    value: "2:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                15: {
                    value: "3:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                16: {
                    value: "4:4",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                17: {
                    value: "AOS",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        8: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "HH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                3: {
                    value: "HD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                4: {
                    value: "HA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                5: {
                    value: "DH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                6: {
                    value: "DD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                7: {
                    value: "DA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                8: {
                    value: "AH",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                9: {
                    value: "AD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                10: {
                    value: "AA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                }
            }
        ],
        9: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "First Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Last Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "No Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ]
    },
    3: {
        0: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        7: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        1: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        2: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        4: [
            {
                0: {
                    value: "contest",
                    colSpan: 8,
                    rowSpan: "",
                    className: "text-center margin-left-20",
                    type: "header"
                },
                1: {
                    value: "odds",
                    colSpan: "",
                    rowSpan: "",
                    width: "100px",
                    className: "",
                    type: "header"
                }
            }
        ],
        3: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "Double Chance",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                4: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                5: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "1X",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                7: {
                    value: "12",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                8: {
                    value: "X2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
            }
        ],
        5: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "Odd",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Even",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "0~1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "2~3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "4~6",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "7 & Over",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        6: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "1:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "2:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "2:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "3:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "3:1",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "3:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                8: {
                    value: "4:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                9: {
                    value: "4:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                10: {
                    value: "4:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                11: {
                    value: "4:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                12: {
                    value: "0:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                13: {
                    value: "1:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                14: {
                    value: "2:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                15: {
                    value: "3:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                16: {
                    value: "4:4",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                17: {
                    value: "AOS",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        8: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "HH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                3: {
                    value: "HD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                4: {
                    value: "HA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                5: {
                    value: "DH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                6: {
                    value: "DD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                7: {
                    value: "DA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                8: {
                    value: "AH",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                9: {
                    value: "AD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                10: {
                    value: "AA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                }
            }
        ],
        9: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "First Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Last Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "No Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ]
    },
    15: {
        0: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        7: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        1: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        2: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        4: [
            {
                0: {
                    value: "contest",
                    colSpan: 8,
                    rowSpan: "",
                    className: "text-center margin-left-20",
                    type: "header"
                },
                1: {
                    value: "odds",
                    colSpan: "",
                    rowSpan: "",
                    width: "100px",
                    className: "",
                    type: "header"
                }
            }
        ],
        3: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "Double Chance",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                4: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                5: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "1X",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                7: {
                    value: "12",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                8: {
                    value: "X2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
            }
        ],
        5: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "Odd",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Even",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "0~1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "2~3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "4~6",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "7 & Over",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        6: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "1:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "2:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "2:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "3:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "3:1",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "3:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                8: {
                    value: "4:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                9: {
                    value: "4:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                10: {
                    value: "4:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                11: {
                    value: "4:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                12: {
                    value: "0:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                13: {
                    value: "1:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                14: {
                    value: "2:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                15: {
                    value: "3:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                16: {
                    value: "4:4",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                17: {
                    value: "AOS",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        8: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "HH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                3: {
                    value: "HD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                4: {
                    value: "HA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                5: {
                    value: "DH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                6: {
                    value: "DD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                7: {
                    value: "DA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                8: {
                    value: "AH",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                9: {
                    value: "AD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                10: {
                    value: "AA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                }
            }
        ],
        9: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "First Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Last Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "No Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ]
    },
    34: {
        0: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        7: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        1: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        2: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '125px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 4,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "o/e",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                4: {
                    value: "1x2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                5: {
                    value: "hdp",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "o/u",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
                // 7: {
                //     value: 'o/e',
                //     colSpan: 1,
                //     rowSpan: 1,
                //     width: 1,
                //     className: 'text-center border-right-none1 border-left-none1',
                //     type: 'odds'
                // }
            }
        ],
        4: [
            {
                0: {
                    value: "contest",
                    colSpan: 8,
                    rowSpan: "",
                    className: "text-center margin-left-20",
                    type: "header"
                },
                1: {
                    value: "odds",
                    colSpan: "",
                    rowSpan: "",
                    width: "100px",
                    className: "",
                    type: "header"
                }
            }
        ],
        3: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 2,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 2,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "fullTime",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "1stHalf",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "Double Chance",
                    colSpan: 3,
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                }
            },
            {
                0: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                1: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                2: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                3: {
                    value: "1",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                4: {
                    value: "x",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                5: {
                    value: "2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                6: {
                    value: "1X",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 2,
                    className: "text-center border-right-none1",
                    type: "odds"
                },
                7: {
                    value: "12",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                },
                8: {
                    value: "X2",
                    colSpan: 1,
                    rowSpan: 1,
                    width: 1,
                    className:
                        "text-center border-right-none1 border-left-none1",
                    type: "odds"
                }
            }
        ],
        5: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "Odd",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Even",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "0~1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "2~3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "4~6",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "7 & Over",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        6: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "1:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "2:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "2:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                5: {
                    value: "3:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                6: {
                    value: "3:1",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "",
                    type: "header"
                },
                7: {
                    value: "3:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                8: {
                    value: "4:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                9: {
                    value: "4:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                10: {
                    value: "4:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                11: {
                    value: "4:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                12: {
                    value: "0:0",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                13: {
                    value: "1:1",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                14: {
                    value: "2:2",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                15: {
                    value: "3:3",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                16: {
                    value: "4:4",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                17: {
                    value: "AOS",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ],
        8: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "HH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                3: {
                    value: "HD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                4: {
                    value: "HA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                5: {
                    value: "DH",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                6: {
                    value: "DD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                7: {
                    value: "DA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                8: {
                    value: "AH",
                    colSpan: "",
                    rowSpan: "",
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                9: {
                    value: "AD",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                },
                10: {
                    value: "AA",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "uppercase",
                    type: "header"
                }
            }
        ],
        9: [
            {
                0: {
                    value: "time",
                    colSpan: 1,
                    rowSpan: 1,
                    // width: '100px',
                    className: "",
                    type: "header"
                },
                1: {
                    value: "event",
                    colSpan: "6",
                    rowSpan: 1,
                    // width: '200px',
                    className: "",
                    type: "header"
                },
                2: {
                    value: "First Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                3: {
                    value: "Last Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                },
                4: {
                    value: "No Goal",
                    colSpan: "",
                    rowSpan: 1,
                    width: "",
                    className: "",
                    type: "header"
                }
            }
        ]
    }
};

sportConfig._getLogo = function() {
    let { origin } = document.location;
    let hostname = "";
    if (origin.indexOf("7sports") != -1) {
        hostname = "7sports";
    } else if (origin.indexOf("7sport") != -1) {
        hostname = "tujuh";
    } else if (origin.indexOf("tujuh") != -1) {
        hostname = "tujuh";
    } else if (origin.indexOf("klik7") != -1) {
        hostname = "klik7";
    } else {
        hostname = "7sports";
    }
    let { listLogo } = sportConfig;
    let item = listLogo.find(x => x.host == hostname);
    var logo =
        ((item && item.logo) || "/images/logo.png") + "?v=" + Math.random();
    return logo;
};
sportConfig._getTitle = function() {
    let { origin } = document.location;
    let hostname = "";
    if (origin.indexOf("tujuh") != -1) {
        hostname = "tujuh";
    } else if (origin.indexOf("klik7") != -1) {
        hostname = "klik7";
    } else {
        hostname = "7sports";
    }
    let { listLogo } = sportConfig;
    let item = listLogo.find(x => x.host == hostname);
    var title = (item && item.title) || "7Sports.co";
    return title;
};
sportConfig._getClassLogo = function() {
    let { hostname } = window.location;
    let { listLogo } = sportConfig;
    let item = listLogo.find(x => x.host == hostname);
    var class_logo = (item && item.class) || "logo";
    return class_logo;
};
sportConfig.InitIcon = function() {
    let { hostname } = window.location;
    let item = sportConfig.listIcon.find(x => x.host == hostname);
    let link = ((item && item.icon) || "/7sports.ico") + "?v=" + Math.random();
    let $favicon = document.querySelector('link[rel="icon"]');
    if ($favicon !== null) {
        $favicon.href = link;
    } else {
        $favicon = document.createElement("link");
        $favicon.rel = "icon";
        $favicon.href = link;
        document.head.appendChild($favicon);
    }
};

module.exports = sportConfig;
