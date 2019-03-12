const BoldGoldJackPotType = (value, pos) => {
    var result = ''
    switch (pos) {
        case "top":
            if (['three_of_a_kind'].indexOf(value) != -1) {
                result = 'text-orange'
            }
            break;
        case "middle":
            if (['flush', 'fullhouse', 'four_of_a_kind', 'straight_flush'].indexOf(value) != -1) {
                result = 'text-orange'
            }
            break;
        case "bottom":
            if (['four_of_a_kind', 'straight_flush'].indexOf(value) != -1) {
                result = 'text-orange'
            }
            break;
        default:
            result = ''
            break;
    }

    return result
}
module.exports = BoldGoldJackPotType
