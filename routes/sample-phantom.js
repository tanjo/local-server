module.exports = function(req, res) {
  var phantom = require('phantom');

  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open('http://tanjo.github.io/').then(function(status) {
        page.property('content').then(function(content) {
          res.render('sample-phantom', { status: status, content: content });
          page.close();
          ph.exit();
        });
      });
    });
  });
};
