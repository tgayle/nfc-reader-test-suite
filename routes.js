const cardTools = require('./card-tools');

module.exports = function(app, mockCard) {
  app.get('/', function(req, res) {
    res.render('index', mockCard);
  });

  app.get('/id', function(req, res) {
    res.json(mockCard);
  });

  app.post('/id', function(req, res) {
    currentIdInfo.id = '';
    res.json(mockCard);
  });

  app.post('/id/dev', function(req, res) {
    console.log(req.body);
    let {uid, atqa, sak, ats} = req.body;
    if (cardTools.idIsValid(uid, 8)) {
      mockCard.id = uid;
      res.json(mockCard);
    } else {
      res.send(401, `Invalid UID: ${uid}`);
    }
  });

  app.post('/id/:new_id', function(req, res) {
    currentIdInfo.id = req.params.new_id;
    res.json(mockCard);
  });
};
