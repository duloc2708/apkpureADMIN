export default (oddsValue) => {
    oddsValue = oddsValue.toString();
    let indexDot = oddsValue.indexOf('.');
    if(indexDot == -1) {
        oddsValue+='.00'
    }
    else {
        var numberAfterDot = oddsValue.substr(indexDot, oddsValue.length);
        if(numberAfterDot.length < 3) {
            oddsValue+='0'
        }
        else {
            oddsValue = oddsValue.substr(0, oddsValue.indexOf('.') + 4)
        }
    }
    return oddsValue;
}