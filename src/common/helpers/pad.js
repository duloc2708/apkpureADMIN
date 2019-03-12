export default (str, max) => {
    function pad(str, max) {
        str = str.toString()
        return str.length < max ? pad("0" + str, max) : str
    }
    return pad(str, max)
}