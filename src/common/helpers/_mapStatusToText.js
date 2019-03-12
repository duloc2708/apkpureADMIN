module.exports = (status) => {
    return {
        0: 'Rejected',
        1: 'Running',
        2: 'Pending',
        3: 'Won',
        4: 'Lose',
        5: 'Refunded',
        6: 'Line odds change',
        7: 'Rejected',
        8: 'Exception before confirm',
        9: 'Exception after confirm',
        10: 'Rejected',
        11: 'Rejected',
        12: 'Rejected',
        13: 'Draw',
        14: 'Rejected',
        15: 'UNAVAILABLE GAME',
        20: 'BUY JACKPOT',
        21: 'WIN JACKPOT',
        22: 'WIN GLOBAL JACKPOT'
    } [status]
}