/**
 *
 * Created by samirmarin on 2016-02-27.
 */

var request = require('request');

var Glassdoor = {
  URL:       "https://api.glassdoor.com/api/api.htm?",
  Version:      "1",
  Format:       "json",
  PartnerID:    "56346",
  PartnerKey:   "evsFdSDtY2K",
  Action:       "employers",
  parameters: {
    "v":    "1",
    "format":"json",
    "t.p":  "56346",
    "t.k":  "evsFdSDtY2K",
    "userip": "0.0.0.0",
    "useragent": "",
    "action":"employers"
  },

  getResponseForCompany: function(companySearch,callback) {

    request(this.buildGlassDoorHttp(companySearch), function(error, response, body) {
      if(!error) {
        var employers = JSON.parse(body).response.employers;

        if(employers && employers.length != 0){
          var employer = employers[0];
          var glassDoorInfo = {
            website: employer.website,
            logoUrl: employer.squareLogo,
            rating: employer.overallRating,
            name: employer.name
          };
          callback(glassDoorInfo);
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  },

  buildGlassDoorHttp: function(companySearch){
    var glassDoorComponents = this.buildParams(this.parameters);
    return this.URL + glassDoorComponents + "q=" + companySearch;
  },
  buildParams: function (object) {
    var res = "";
    for (key in object) {
      res += key + "=" + object[key] + "&";
    }
    return res
  }
};

Glassdoor.getResponseForCompany("google", function(response) {
  console.log(response);
});

module.exports = Glassdoor;