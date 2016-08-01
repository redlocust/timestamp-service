var http = require('http');
var moment = require('moment');

http.createServer(function (req, res) {
  var time;

  console.log('Incoming request to ' + req.url);

  var preparedUrl = req.url.substring(1).split('%20').join(' ');

  if (isNaN(+preparedUrl)) {
    time = moment(preparedUrl);

  } else {
    time = moment(+preparedUrl);
  }

  var timeNatural = time.format("MMMM Do YYYY");
  var timeUnix = time.format("x");

  if ((timeNatural || timeUnix) === "Invalid date") {
    timeUnix = null;
    timeNatural = null;
  }

  res.end('{"unix":' + timeUnix + ', "natural": "' + timeNatural + '"}');

}).listen(process.env.PORT, process.env.IP);