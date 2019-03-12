import _parseOddsArray from './_parseOddsArray'
import roundOdds from './roundOdds'
export default (objOdds, oddsEntry, notRound) => {
    let temp = null
    switch (true) {
        //same odds
        case (objOdds.type == oddsEntry):
            return new Decimal(objOdds.value).toString()
            //another odds
        case (objOdds.type != oddsEntry):
            switch (true) {
                case (objOdds.type == null):
                    return null
                    //default odds - parse Amecican to --> oddsEntry
                case (objOdds.type != 0 &&
                    typeof _parseOddsArray[objOdds.type][oddsEntry] != 'function'):
                    temp = _parseOddsArray[0][oddsEntry](_parseOddsArray[objOdds.type][0](objOdds.value))
                    return notRound == true ? temp : roundOdds(temp)
                case (objOdds.type != 0 &&
                    typeof _parseOddsArray[objOdds.type][oddsEntry] == 'function'):
                    temp = _parseOddsArray[objOdds.type][oddsEntry](objOdds.value)
                    return roundOdds(temp)
                case (objOdds.type == 0):
                    //parse value objOdds --> American --> oddsEntry
                    temp = _parseOddsArray[objOdds.type][oddsEntry](objOdds.value)
                    return notRound == true ? temp : roundOdds(temp)
            }
    }
}