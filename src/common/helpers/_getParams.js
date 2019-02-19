export default (url_string, key) => {
    const url = new URL(url_string)
    const val = url.searchParams.get(key)
    return val
}