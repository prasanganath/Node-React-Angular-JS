const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');

// Init Nexmo
const nexmo = new Nexmo({
    apiKey: '5cb6e764',
    apiSecret: '9mBRkEnn4xZnd2gr'
  }, { debug: true });


  
  // Init app
  const app = express();
  
  // Template engine setup
  app.set('view engine', 'html');
  app.engine('html', ejs.renderFile);
  
  // Public folder setup
  app.use(express.static(__dirname + '/public'));
  
  // Body parser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Index route
app.get('/', (req, res) => {
    res.render('index');
  });

  //Catch from submit
  app.post('/', (req, res) => {
      //res.send(req.body);
      //console.log(req.body);
      const number = req.body.number;
      const text = req.body.text;

      nexmo.message.sendSms(
          '0779592218', number, text, { type: 'unicode' },
          (error, responseData) => {
              if(err) {
                  console.log(err);
              } else {
                  console.dir(responseData);
              }
          }
      );
  });
  

  // Define port
const port = 3000;

// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
