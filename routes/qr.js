module.exports = function(req, res) {
  var qr = require('qr-image');

  var text = req.param('text');
  var qrimage;
  if (text) {
    var image = qr.imageSync(text, { type: 'png' });
    var base64image = new Buffer(image, 'binary').toString('base64');
    qrimage = 'data:image/png;base64,' + base64image;
  }
  res.render('qr', { qrimage: qrimage });
};
