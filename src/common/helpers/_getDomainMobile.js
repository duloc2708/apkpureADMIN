export default (type) => {
    let origin = window.location.origin || ''
    if (origin.indexOf('localhost') != -1) {
        return 'http://m7sdev.kolabs.co'
    }
    else if (origin.indexOf('qa') != -1) {
        return 'http://m7sdev.kolabs.co'
    }
    else if (origin.indexOf('192.168') != -1) {
        return 'http://m7sdev.kolabs.co'
    }
    else if (origin.indexOf('stag') != -1) {
        return 'http://m7sstag.kolabs.co'
    }
    else if (origin.indexOf('prod') != -1) {
        return 'http://m.7sports.co'
    }
    else if (origin.indexOf('7sports.co') != -1) {
        return 'http://m.7sports.co'
    }
}
