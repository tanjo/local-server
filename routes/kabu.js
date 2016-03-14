module.exports = function(req, res) {

  var code = req.query.code;

  if (code) {
    var phantom = require('phantom');
    phantom.create().then(function(ph) {
      ph.createPage().then(function(page) {
        page.open('http://stocks.finance.yahoo.co.jp/stocks/chart/?code=' + code + '.T&ct=z&t=1m&q=c&l=off&z=m&p=b&a=m,ss').then(function(status) {
          console.log('kabu <open> : ' + status);
          page.evaluate(function() {
            return {
              name: document.getElementsByClassName('symbol')[0].innerText,
              value: document.getElementsByClassName('stoksPrice')[1].innerText,
              img: document.getElementsByClassName('padT12 centerFi marB10')[0].firstElementChild.src
            };
          }).then(function(data) {
            res.render('kabu', {
              symbol: data.name,
              stoksPrice: data.value,
              imageUrl: data.img
            });
            page.close();
            ph.exit();
          });
        });
      });
    });
  } else {
    res.render('kabu');
  }
};
