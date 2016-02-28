/**
 *
 * Created by samirmarin on 2016-02-27.
 */

// var request = require('request');

var parameters = {
    "v":    "1",
    "format":"json",
    "t.p":  "56346",
    "t.k":  "evsFdSDtY2K",
    "userip": "128.189.89.205",
    "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36",
    "action":"employers",
    "callback":"?"
  };

var Glassdoor = {
  URL:       "https://api.glassdoor.com/api/api.htm?",
  Version:      "1",
  Format:       "json",
  PartnerID:    "56346",
  PartnerKey:   "evsFdSDtY2K",
  Action:       "employers",

  getResponseForCompany: function(companySearch,callback) {
    $.getJSON(this.buildGlassDoorHttp(companySearch), function(jsonp){
      var employers = [];
      if (jsonp) {
        employers = jsonp.response.employers
      };
      callback(employers);
    });
  },

  buildGlassDoorHttp: function(companySearch){
    var glassDoorComponents = this.buildParams(parameters);
    return this.URL + glassDoorComponents + "q=" + companySearch;
  },

  buildParams: function (params) {
    console.log(params);
    var res = "";
    for (var key in params) {
      res += key + "=" + params[key] + "&";
    };
    return res
  }

};

module.exports = Glassdoor;