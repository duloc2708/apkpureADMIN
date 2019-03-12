export default (market, mode) => {
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
                        className: 'separate-line',
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
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    6: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    9: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    10: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    11: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    }
                }],
                7: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '50px',
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
                        className: 'separate-line',
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
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    6: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'text-center',
                        type: 'odds'
                    },
                    7: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    9: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    10: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    11: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    }
                }],
                1: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        colSpan: 1,
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
                        className: 'separate-line',
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
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    6: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'text-center',
                        type: 'odds'
                    },
                    8: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    9: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    10: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    11: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
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
                        colSpan: 1,
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
                        className: 'separate-line',
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
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    6: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    9: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    10: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    11: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    }
                }],
                4: [{
                    0: {
                        value: 'contest',
                        colSpan: '',
                        rowSpan: '',
                        className: '',
                        width: '80%',
                        type: 'header'
                    },
                    1: {
                        value: 'odds',
                        colSpan: 2,
                        rowSpan: '',
                        width: '20%',
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
                        colSpan: 1,
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
                        className: 'separate-line',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: 'separate-line',
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
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'x',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: '2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    3: {
                        value: '1',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'x',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: '2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    6: {
                        value: '1X',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: '12',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'X2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    }
                }],
                5: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 1,
                        className: '',
                        type: 'header'
                    },
                    1: {
                        value: 'event',
                        rowSpan: 1,
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'Odd',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: 'Even',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: '0~1',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    5: {
                        value: '2~3',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    6: {
                        value: '4~6',
                        colSpan: '',
                        rowSpan: '',
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    7: {
                        value: '7 & Over',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
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
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: '2:0',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: '2:1',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    5: {
                        value: '3:0',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    6: {
                        value: '3:1',
                        colSpan: '',
                        rowSpan: '',
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    7: {
                        value: '3:2',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    8: {
                        value: '4:0',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    9: {
                        value: '4:1',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    10: {
                        value: '4:2',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    11: {
                        value: '4:3',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    12: {
                        value: '0:0',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    13: {
                        value: '1:1',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    14: {
                        value: '2:2',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    15: {
                        value: '3:3',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    16: {
                        value: '4:4',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
                        className: '',
                        type: 'header'
                    },
                    17: {
                        value: 'AOS',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '50px',
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
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'HH',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: 'HD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: 'HA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    5: {
                        value: 'DH',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    6: {
                        value: 'DD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    7: {
                        value: 'DA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    8: {
                        value: 'AH',
                        colSpan: '',
                        rowSpan: '',
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    9: {
                        value: 'AD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'header'
                    },
                    10: {
                        value: 'AA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
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
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'First Goal',
                        colSpan: '',
                        rowSpan: 1,
                        width: '180px',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: 'Last Goal',
                        colSpan: '',
                        rowSpan: 1,
                        width: '180px',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: 'No Goal',
                        colSpan: '',
                        rowSpan: 1,
                        width: '180px',
                        className: '',
                        type: 'header'
                    }
                }],
                99: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '50px',
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
                        className: 'separate-line',
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
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    6: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: 'text-center',
                        type: 'odds'
                    },
                    7: {
                        value: 'home',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'away',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    9: {
                        value: 'goal',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    10: {
                        value: 'over',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    },
                    11: {
                        value: 'under',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '50px',
                        className: '',
                        type: 'odds'
                    }
                }],
            } [market]
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
                        className: 'separate-line',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 4,
                        rowSpan: '',
                        // width: '',
                        className: '',
                        type: 'header'
                    }
                }, {
                    0: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '60px',
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '90px',
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '90px',
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '80px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    4: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '60px',
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '90px',
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '90px',
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'odds'
                    },
                }],
                7: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '50px',
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
                        className: 'separate-line',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 4,
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
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '80px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    4: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 2,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'odds'
                    },
                }],
                1: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '50px',
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
                        className: 'separator separate-line',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 4,
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
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '80px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    4: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 2,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '80px',
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
                        className: 'separate-line',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 4,
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
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    3: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '80px',
                        className: 'separate-line',
                        type: 'odds'
                    },
                    4: {
                        value: '1x2',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 2,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: 'hdp',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    6: {
                        value: 'o/u',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: 'o/e',
                        colSpan: 1,
                        rowSpan: 1,
                        width: '80px',
                        className: '',
                        type: 'odds'
                    },
                }],
                4: [{
                    0: {
                        value: 'contest',
                        colSpan: '',
                        rowSpan: '',
                        className: '',
                        width: '80%',
                        type: 'header'
                    },
                    1: {
                        value: 'odds',
                        colSpan: 2,
                        rowSpan: 1,
                        width: '20%',
                        className: '',
                        type: 'header'
                    },
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
                        className: 'separate-line',
                        type: 'header'
                    },
                    3: {
                        value: '1stHalf',
                        colSpan: 3,
                        rowSpan: '',
                        width: '',
                        className: 'separate-line',
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
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    1: {
                        value: 'x',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    2: {
                        value: '2',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: 'separate-line',
                        type: 'odds'
                    },
                    3: {
                        value: '1',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 2,
                        className: '',
                        type: 'odds'
                    },
                    4: {
                        value: 'x',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    5: {
                        value: '2',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: 'separate-line',
                        type: 'odds'
                    },
                    6: {
                        value: '1X',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 2,
                        className: '',
                        type: 'odds'
                    },
                    7: {
                        value: '12',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
                        className: '',
                        type: 'odds'
                    },
                    8: {
                        value: 'X2',
                        colSpan: 1,
                        rowSpan: 1,
                        // width: 1,
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
                        colSpan: '',
                        rowSpan: 1,
                        // width: '80px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'Odd',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '80px',
                        className: '',
                        type: 'header'
                    },
                    3: {
                        value: 'Even',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '80px',
                        className: '',
                        type: 'header'
                    },
                    4: {
                        value: '0~1',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '80px',
                        className: '',
                        type: 'header'
                    },
                    5: {
                        value: '2~3',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '80px',
                        className: '',
                        type: 'header'
                    },
                    6: {
                        value: '4~6',
                        colSpan: '',
                        rowSpan: '',
                        // width: '80px',
                        className: '',
                        type: 'header'
                    },
                    7: {
                        value: '7 & Over',
                        colSpan: '',
                        rowSpan: 1,
                        // width: '80px',
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
                        colSpan: 1,
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
                        colSpan: 1,
                        rowSpan: 1,
                        // width: '200px',
                        className: '',
                        type: 'header'
                    },
                    2: {
                        value: 'HH',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: 'uppercase',
                        type: 'header'
                    },
                    3: {
                        value: 'HD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: 'uppercase',
                        type: 'header'
                    },
                    4: {
                        value: 'HA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: 'uppercase',
                        type: 'header'
                    },
                    5: {
                        value: 'DH',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: 'uppercase',
                        type: 'header'
                    },
                    6: {
                        value: 'DD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: 'uppercase',
                        type: 'header'
                    },
                    7: {
                        value: 'DA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: 'uppercase',
                        type: 'header'
                    },
                    8: {
                        value: 'AH',
                        colSpan: '',
                        rowSpan: '',
                        width: '80px',
                        className: 'uppercase',
                        type: 'header'
                    },
                    9: {
                        value: 'AD',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
                        className: 'uppercase',
                        type: 'header'
                    },
                    10: {
                        value: 'AA',
                        colSpan: '',
                        rowSpan: 1,
                        width: '80px',
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
                        colSpan: 1,
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
                99: [{
                    0: {
                        value: 'time',
                        colSpan: 1,
                        rowSpan: 2,
                        // width: '50px',
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
            } [parseInt(market)]
            break
        default:
            return
    }
}