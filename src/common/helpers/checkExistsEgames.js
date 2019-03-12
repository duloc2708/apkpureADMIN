export default (code) => {
    if (['poker', 'threecards', 'thirteencards', 'dominoesqq', 'ceme', 'ceme_keliling', 'capsa'].indexOf(code) != -1) {
        return true
    } else {
        return false
    }
}