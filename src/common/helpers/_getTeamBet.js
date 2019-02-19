export default (marketT, side) => {
    switch (marketT) {
        case 15:
            if (side == 48) {
                return 'No Corner';
            }
            return SportConfig.mapSideToTeam[side];
            break;
        default:
            return SportConfig.mapSideToTeam[side];
            break;
    }
}