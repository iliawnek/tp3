var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var router = express.Router();
var net = require('net');

router.route('/accounts/:number')
  .get(function (request, response) {
    var client = connect(3031);
    write(client, 'DATA GET', {
      number: parseInt(request.params.number),
    });
    client.on('data', function (data) {
      response.json({data});
      client.destroy();
    });
  })
;

router.route('/accounts')
  .post(function (request, response) {
    var client = connect(3031);
    write(client, 'DATA POST', {
      number: parseInt(request.query.number),
      holder: parseInt(request.query.holder),
      start_balance: parseFloat(request.query.start_balance),
    });
    client.on('data', function (data) {
      response.json({data});
      client.destroy();
    });
  })
;

router.route('/transactions')
  .get(function (request, response) {
    var client = connect(9999, '0.0.0.0');
    write(client, 'DATA GET', {
      account: parseInt(request.query.account),
      start_date: parseInt(request.query.start_date),
      end_date: parseInt(request.query.end_date),
    });
    client.on('data', function (data) {
      response.json({data});
      client.destroy();
    })
  })

  .post(function (request, response) {
    var client = connect(3032);
    write(client, 'DATA POST', {
      from: parseInt(request.query.from),
      to: parseInt(request.query.to),
      amount: parseFloat(request.query.amount),
    });
    client.on('data', function (data) {
      response.json({data});
      client.destroy();
    });
  })
;

// Initialise socket connection.
function connect(port, host) {
  var client = new net.Socket();
  client.setEncoding('utf8');
  client.connect(port, host || '127.0.0.1');
  return client;
}

// Write to socket.
function write(client, command, params) {
  console.log(JSON.stringify(params));
  client.write(command + ' ' + JSON.stringify(params) + '\n');
}

app.use('/api', router);
app.listen(port);