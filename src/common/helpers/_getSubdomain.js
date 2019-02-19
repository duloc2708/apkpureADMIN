export default function(h) {
    let parts = h.split(".")
    if (parts.length == 2) return "www"
    return parts[0]
}