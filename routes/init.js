// const fileIndex = 'index';
const fileIndex = 'maintenance';
var functions = require('../functions');

module.exports = function(app) {
    // app.get('/livestream', function(req, res) {
    //     var objStatus = functions.checkStatusMaintaince();
    //     var fileIndex = (objStatus && objStatus.status) ? 'maintenance' : 'livestream';
    //     functions.resView(req, res, fileIndex, objStatus)
    // });
    // app.get('/getCode' , function(req, res){
    //     res.json(200)
    // })
    app.get('*', function(req, res) {
        var objStatus = functions.checkStatusMaintaince();
        var fileIndex = (objStatus && objStatus.status) ? 'maintenance' : 'index';
        functions.resView(req, res, fileIndex, objStatus)
    });
}