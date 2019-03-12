const _getClassForMarket = (maket) => {
    return {
        0: 'today',
        1: 'live',
        2: 'today',
        3: 'double_change_1_x_2',
        4: 'outright',
        5: 'odd_even_total_goals',
        6: 'ft_fh_correct_score',
        7: 'mix_parlay',
        8: 'ht_ft',
        9: 'fg_lg'
    } [maket]
}
module.exports = _getClassForMarket