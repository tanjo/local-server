module.exports = function(err, req, res, next) {
  res.render('500', { err: err });
};
