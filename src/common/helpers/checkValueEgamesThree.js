export default (code) => {
    var rs = ''
    switch (code) {
        case 'murni_kecil':
            rs = 'Murni Kecil';
            break;
        case 'murni_besar':
            rs = 'Murni Besar';
            break;
        case 'balak':
            rs = 'Balak';
            break;
        case 'enam_dewa':
            rs = 'Enam Dewa';
            break;
        case '3_k':
            rs = 'Triple King';
            break;
        case '3_q':
            rs = 'Triple Queen';
            break;
        case '3_j':
            rs = 'Triple Jack';
            break;
        case '3_10':
            rs = 'Triple 10';
            break;
        case 'full_court':
            rs = 'Full Court';
            break;
        case 'super_royal_flush':
            rs = 'Super Royal Flush';
            break;
        case 'royal_flush':
            rs = 'Royal Flush';
            break;
        case 'straight_flush':
            rs = 'Straight Flush';
            break;
        case 'four_of_a_kind':
            rs = '4 of a kind';
            break;
        case 'fullhouse':
            rs = 'Full House';
            break;
        case 'flush':
            rs = 'Flush';
            break;
        case 'straight':
            rs = 'Straight';
            break;
        case 'three_of_a_kind':
            rs = '3 of a kind';
            break;
        case 'two_pair':
            rs = '2 Pairs';
            break;
        case 'pair':
            rs = 'Pair';
            break;
        case 'high_card':
            rs = 'High Card';
            break;
        case 'dragon_rolling_straight':
            rs = 'Dragon Flush';
            break;
        case 'dragon_straight':
            rs = 'Dragon';
            break;
        case '12_same_color':
            rs = '12 same color';
            break;
        case '6_pair':
            rs = '6 Pairs';
            break;
        case '5_pair_streak':
            rs = '5 pairs straight';
            break;
        case '5_pairs_straight':
            rs = '5 pairs straight';
            break;
        case '6_dup':
            rs = '6 pairs';
            break;
        case '4_2_cards':
            rs = '4 2 cards';
            break;
        case 'fold':
            rs = 'Fold';
            break;
        case 'last':
            rs = 'Last Stand';
            break;
        case 'raise':
            rs = 'Raise';
            break;
        case 'call':
            rs = 'Call';
            break;
        case 'check':
            rs = 'Check';
            break;
        case 'allin':
            rs = 'ALL IN';
            break;
        case 'blind':
            rs = 'BIG BLIND';
            break;
        case 'semi_blind':
            rs = 'SM. BLIND';
            break;
        case 'tiny':
            rs = 'TINY';
            break;
        case 'normal':
            rs = 'NORMAL';
            break;
        case 'small':
            rs = 'SMALL';
            break;
        case 'medium':
            rs = 'MEDIUM';
            break;
        case 'large':
            rs = 'LARGE';
            break;
        case 'vip':
            rs = 'VIP';
            break;
        default:
            rs = code;
            break;
    }
    if (parseInt(rs)) {
        return true
    }
    else {
        return false
    }
}
