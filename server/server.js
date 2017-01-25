var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3001;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/banking-webapp');
var Account = require('./app/models/account');

var router = express.Router();

router.use(function (request, response, next) {
  next();
});

router.get('/', function (request, response) {
  response.json({message: 'Hello there!'});
});

router.route('/accounts')

  .post(function (request, response) {
    var account = new Account();
    account.name = request.query.name;
    account.balance = request.query.balance;
    account.save(function (error) {
      if (error) response.send(error);
      response.json({message: 'Account \'' + account.name + '\' created.'})
    });
  })

  .get(function (request, response) {
    Account.find(function (error, accounts) {
      if (error) response.send(error);
      response.json(accounts);
    });
  });

router.route('/accounts/:id')

  .get(function (request, response) {
    Account.findById(request.params.id, function (error, account) {
      if (error) response.send(error);
      response.json(account);
    });
  })

  .put(function (request, response) {
    Account.findById(request.params.id, function (error, account) {
      if (error) response.send(error);
      var previousBalance = account.balance;
      var newBalance = request.query.balance;
      account.balance = newBalance;
      account.save(function (error) {
        if (error) response.send(error);
        response.json({message: 'Balance on account \'' + account.name + '\' changed from ' + previousBalance + ' to ' + newBalance + '.'})
      });
    });
  })

  .delete(function (request, response) {
    Account.remove({_id: request.params.id}, function (error, account) {
      if (error) response.send(error);
      response.json({message: 'Account \'' + account.name + '\' deleted.'});
    });
  });

app.use('/api', router);

app.listen(port);
console.log('Server started on port ' + port + '.');