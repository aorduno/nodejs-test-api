var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testForm', function(req, res) {
	// The form's action is '/' and its method is 'POST',
  // so the `app.post('/', ...` route will receive the
  // result of our form
  var html = '<form action="https://encore1.193mirror.test/apps/encore/sso/okta/agentLogin" method="POST">' +
               'Enter your name:' +
               '<input type="text" name="SAMLResponse" placeholder="..." />' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';

  res.send(html);
});

module.exports = router;
