module.exports = function(req, res, next) {
  res.render('404', { path: req.path });
};
