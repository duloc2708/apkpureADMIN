export default (timeStr) => {
    const off = timeStr[0]
    const val = timeStr.substring(1, timeStr.length)
    return `GMT ${timeStr}`
}