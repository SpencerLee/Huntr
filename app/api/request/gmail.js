
// Uses the gmail js api library, set in the main ejs file as a script
// the token for this is setup in the main.js file

var headerNames = {
  FROM:       "From",
  DATE:       "Date",
  SUBJECT:    "Subject"
};
var Gmail = {
  getListOfMessages:function(userId, queryString, token, callback) {
    gapi.auth.setToken({
      access_token: user.token
    });
    var restRequest = gapi.client.request({
      'path': '/gmail/v1/users/' + userId + '/messages',
      'params': {'q': queryString}
    });

    restRequest.then(function(resp) {
      if (resp.result && resp.result.messages) {
        // We have individual msgs, now get details for all of them
        var batch = gapi.client.newBatch();
        var messages = resp.result.messages;
        messages.map(function(msg) {
          var request = gapi.client.request({
            'path': '/gmail/v1/users/' + userId + '/messages/' + msg.id
          });
          batch.add(request);
        });
        batch.then(function(resp) {
          if (resp.result) {
            var emails = resp.result;
            var response = [];
            for (var idx in emails) {
              var email = emails[idx];
              var info = email.result;
              var headers = info.payload.headers;
              var from, date, subject;
              for (var idx in headers) {
                var hdrName = headers[idx]['name'];
                switch(hdrName) {
                  case headerNames.FROM:
                    from = headers[idx]['value'];
                  case headerNames.SUBJECT:
                    subject = headers[idx]['value'];
                  case headerNames.DATE:
                    date = headers[idx]['value'];
                };
              }
              var emailObj = {
                id: info.id,
                snippet: info.snippet,
                threadId: info.threadId,
                from: from,
                date: date,
                subject: subject
              }
              response.push(emailObj);
            };
            callback(response);
          };
        });
      };
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
      callback([]);
    });
  }
};

module.exports = Gmail;