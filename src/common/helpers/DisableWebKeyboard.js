export default () => {
    document.onkeydown = function(event) {
        event = event || window.event
        var control = event.which || event.keyCode || document.all
        switch (control) {
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
                event.preventDefault()
                event.stopPropagation()
        }
    }
}