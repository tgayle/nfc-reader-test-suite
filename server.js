const cardTools = require('./card-tools');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const currentIdInfo = {
  id: '',
  atqa: '',
  sak: '',
  ats: '',
};

const defaults = {
  atqa: '00 00',
  sak: '00',
  ats: '00 00 00 00',
};

app.get('/', function(req, res) {
  res.render('index', getCurrentCardInfo());
});

app.get('/id', function(req, res) {
  res.json(getCurrentCardInfo());
});

app.post('/id', function(req, res) {
  currentIdInfo.id = '';
  res.json(getCurrentCardInfo());
});

app.post('/id/dev', function(req, res) {
  console.log(req.body);
  let {uid, atqa, sak, ats} = req.body;
  if (cardTools.idIsValid(uid, 8)) {
    currentIdInfo.id = uid;
    res.json(getCurrentCardInfo());
  } else {
    res.send(401, `Invalid UID: ${uid}`);
  }
});

app.post('/id/:new_id', function(req, res) {
  currentIdInfo.id = req.params.new_id;
  res.json(getCurrentCardInfo());
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});

let getCurrentCardInfo = () => {
  return currentIdInfo;
};
