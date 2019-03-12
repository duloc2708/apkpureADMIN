export default (status, type = 0) => {
    if (type == 0) {
        switch (status) {
            case 13:
                return 'drawn'
            case 1:
                return 'running'
            case 3:
                return 'won'
            case 4:
                return 'lose'
            case 5:
                return 'refunded'
            case 20:
                return 'buyJackpot'
            case 21:
                return 'winJackpot'
            case 22:
                return 'winGlobalJackpot'
            case 12:
                return 'rejected'
            case 0:
                return 'rejected'
            default:
                break
        }
    } else {
        switch (status) {
            case 1:
                return 'text-green'
            case 3:
                return 'text-info'
            case 4:
                return 'text-red'
            default:
                break
        }
    }
}