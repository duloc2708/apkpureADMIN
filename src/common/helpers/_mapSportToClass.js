const _mapSportToClass = (sport, isVirtualSports) => {
    return {
        'Soccer': isVirtualSports ? 'ic ic_vs_soccer' : 'ic ic_mainmenu_soccer',
        'Basketball': isVirtualSports ? 'ic ic_vs_basketball' : 'ic ic_mainmenu_basketball',
        'Tennis': isVirtualSports ? 'ic ic_vs_tennis' : 'ic ic_mainmenu_tennis',
        'E Sports': 'ic ic_mainmenu_esport',
        'Baseball': 'ic ic_mainmenu_baseball',
        'Football': 'ic ic_mainmenu_football',
        'ic_mainmenu_volleyball': 'ic ic_mainmenu_volleyball',
        'Badminton': 'ic ic_mainmenu_badminton',
        'Volleyball':'ic ic_mainmenu_volleyball'
    }[sport]
}
module.exports = _mapSportToClass