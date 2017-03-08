var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var router = express.Router();
var net = require('net');

// Service hosts and ports - fixed for demonstration purposes only.
var ACCOUNTS_SERVICE_PORT = 3031;
var REPLAY_SERVICE_PORT = 9999;
var REPLAY_SERVICE_HOST = '0.0.0.0';
var CREATE_TRANSACTION_SERVICE_PORT = 3032;

// /accounts
router.route('/accounts')

  // GET
  .get(function (request, response) {
    var client = connect(ACCOUNTS_SERVICE_PORT);
    write(client, 'DATA GET', {
      number: parseInt(request.query.number),
    });
    client.on('data', function (data) {
      var status = getStatus(data);
      var payload = getPayload(data);
      if (status !== 200) {
        response.status(status).json({message: payload});
      } else {
        response.status(status).json(JSON.parse(payload));
      }
      client.destroy();
    });
  })

  // POST
  .post(function (request, response) {
    var client = connect(ACCOUNTS_SERVICE_PORT);
    write(client, 'DATA POST', {
      number: parseInt(request.query.number),
      holder: request.query.holder,
      start_balance: parseFloat(request.query.start_balance),
    });
    client.on('data', function (data) {
      var status = getStatus(data);
      var payload = getPayload(data);
      response.status(status).json({message: payload});
      client.destroy();
    });
  })
;

// /transactions
router.route('/transactions')

  // GET
  .get(function (request, response) {
    var client = connect(REPLAY_SERVICE_PORT, REPLAY_SERVICE_HOST);
    write(client, 'DATA GET', {
      account: parseInt(request.query.account),
      start_date: parseInt(request.query.start_date),
      end_date: parseInt(request.query.end_date),
    });
    client.on('data', function (data) {
      var status = getStatus(data);
      var payload = getPayload(data);
      if (status !== 200) {
        response.status(status).json({message: payload});
      } else {
        response.status(status).json(JSON.parse(payload));
      }
      client.destroy();
    })
  })

  // POST
  .post(function (request, response) {
    var client = connect(CREATE_TRANSACTION_SERVICE_PORT);
    write(client, 'DATA POST', {
      from: parseInt(request.query.from),
      to: parseInt(request.query.to),
      amount: parseFloat(request.query.amount),
    });
    client.on('data', function (data) {
      var status = getStatus(data);
      var payload = getPayload(data);
      response.status(status).json({message: payload});
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

// Extract HTTP status code from received data.
function getStatus(data) {
  return parseInt(data.substring(0, 3));
}

// Extract payload from received data.
function getPayload(data) {
  return data.substring(4);
}

app.use('/api', router);
app.listen(port);