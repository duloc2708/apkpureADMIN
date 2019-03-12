export default (value) => {
    var result = false
    if (['3_k', '3_q', '3_j', '3_10', 'full_court'].indexOf(value) != -1) {
        result = true
    }
    return result
}