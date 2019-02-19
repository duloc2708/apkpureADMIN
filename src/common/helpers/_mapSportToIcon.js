export default (sportID, isVirtualSports) => {
    return {
        '29': isVirtualSports ? 'ic ic_vs_soccer' : 'ic ic_mainmenu_soccer',
        '4': isVirtualSports ? 'ic ic_vs_basketball' : 'ic ic_mainmenu_basketball',
        '33': isVirtualSports ? 'ic ic_vs_tennis' : 'ic ic_mainmenu_tennis',
        '12': 'ic ic_mainmenu_esport',
        '3': 'ic ic_mainmenu_baseball',
        '15': 'ic ic_mainmenu_football',
        '34': 'ic ic_mainmenu_volleyball',
        '1': 'ic ic_mainmenu_badminton'
    }[sportID]
}