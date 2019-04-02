const _getImageIndex = (data, width = 10, height = 10) => {
    if (data) {
        if (data && data.indexOf('http') != -1) {
            return data
        } else {
            let filename = data.split('\\').pop().split('/').pop();
            // filename = filename.substring(0, filename.lastIndexOf('.'));
            return `${Config.API_IMAGE}?name=${filename}&width=${width}&height=${height}`
        }
    } else {
        return ''
    }

}
module.exports = _getImageIndex