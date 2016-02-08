var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

//post form
router.post('/send', function (req, res) {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mikeulvila@gmail.com',
      pass: ''
    }
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Mike <mikeulvila@gmail.com>', // sender address
      to: 'mikeulvila@me.com', // list of receivers
      subject: 'Testing Nodemailer', // Subject line
      text: 'Info: ' + req.body.name + req.body.email + req.body.message, // plaintext body
      html: '<p>Info: </p>' + '<ul><li>' + req.body.name + '</li><li>' + req.body.email + '</li><li>' + req.body.message + '</li></ul>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info){
      if(error){
          return console.log(error);
          res.redirect('/');
      }
      console.log('Message sent: ' + info.response);
      res.redirect('/');

  });

  //res.send('Form Submitted');

});

module.exports = router;
