var version = "1.0.0";
const fs = require("fs");
var _ = require("lodash");
try {
    const rawSettingVer = fs.readFileSync(__dirname + "/settingVer.json");
    const settingVer = JSON.parse(rawSettingVer);
    version = settingVer ? settingVer.version : version;
} catch (err) {
    version = version;
}
module.exports = {
    checkStatusMaintaince: function() {
        const moment = require("moment");
        var isMaintaince = false;
        const now = moment().format("YYYY-MM-DD HH:mm:ss Z");
        var fromDate = null;
        var toDate = null;
        try {
            const rawSetting = fs.readFileSync(__dirname + "/setting.json");
            const setting = JSON.parse(rawSetting);
            const maintaince = setting ? setting.maintaince : {};
            const data = maintaince ? maintaince.data : {};
            if (data) {
                data.map(function(item, index) {
                    if (
                        now >=
                            moment(item.from, "YYYY-MM-DD HH:mm:ss Z").format(
                                "YYYY-MM-DD HH:mm:ss Z"
                            ) &&
                        now <=
                            moment(item.to, "YYYY-MM-DD HH:mm:ss Z").format(
                                "YYYY-MM-DD HH:mm:ss Z"
                            ) &&
                        item.status
                    ) {
                        isMaintaince = true;
                        fromDate = item.from;
                        toDate = item.to;
                    }
                });
            }
        } catch (err) {
            isMaintaince = false;
        }
        return { status: isMaintaince, from: fromDate, to: toDate };
    },
    resView: function(req, res, fileIndex, objStatus) {
        function getSubdomain(h) {
            var parts = h.split(".");
            if (parts.length == 2) return "www";
            return parts[0];
        }
        const moment = require("moment");

        const subDomain = getSubdomain(req.headers.host);
        var MobileDetect = require("mobile-detect");
        var md = new MobileDetect(req.headers["user-agent"]);
        const query = req.query || {};
        const fromMode = query && query.fromMode ? query.fromMode : null;
        const host = req.headers.host;
        var origin = host;
        if (origin.indexOf("m.") != -1) {
            origin = host.substring(host.indexOf("m.") + 2, host.length);
        }
        const originalUrl = req.originalUrl.substring(
            0,
            req.originalUrl.indexOf("?")
        );
        // if (fromMode == 2 && origin && origin.indexOf('m.') == -1) {
        //     // var fullUrl = req.protocol + '://m.' + origin + (originalUrl != '/' ? originalUrl : '') + '?fromMode=' + fromMode; //prod
        //     // var fullUrl = req.protocol + '://m7sdev.kolabs.co/?fromMode=2'; //dev
        //     var fullUrl = req.protocol + '://' + origin + (originalUrl != '/' ? originalUrl : '') + '?fromMode=2'; //prod
        //     // var fullUrl = 'http://m7sstag.kolabs.co?fromMode=2'; //stage
        //     res.redirect(fullUrl);
        // } else if (md.mobile() && !fromMode) {
        //     // var fullUrl = req.protocol + '://m.' + origin + (originalUrl != '/' ? originalUrl : '') + '?fromMode=2'; //prod
        //     // var fullUrl = req.protocol + '://m7sdev.kolabs.co/?fromMode=2'; //dev
        //     // var fullUrl = 'http://m7sstag.kolabs.co?fromMode=2'; //stage
        //     var fullUrl = req.protocol + '://' + origin + (originalUrl != '/' ? originalUrl : '') + '?fromMode=2'; //prod
        //     res.redirect(fullUrl);
        // } else {
        // if (req.protocol == 'https') {
        //     res.redirect('http://' + req.headers.host + req.url);
        // } else {
        if (subDomain == "zzb8") {
            res.render("index", {
                locals: {
                    moment: moment,
                    objStatus: objStatus,
                    // title: origin.indexOf('localhost') != -1 ? 'ZZB8' : origin,
                    title: "ZZB8",
                    version: version
                }
            });
        } else {
            res.render(fileIndex, {
                locals: {
                    moment: moment,
                    objStatus: objStatus,
                    // title: origin.indexOf('localhost') != -1 ? 'ZZB8' : origin,
                    title: "ZZB8",
                    version: version
                }
            });
        }
        // }
        // }
    }
};
