module.exports = function(req, res) {
  var phantom = require('phantom');

  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open('http://t-amaze.jp/questionnaires/questionnaire_list').then(function(status) {
        page.evaluate(function() {
          var list = document.getElementById('list');
          var ul = list.firstElementChild;

          var contents = [];
          for (var i = 0; i < ul.childNodes.length; i++) {
              var li = ul.childNodes[i];
              var a = li.firstElementChild;
              if (typeof a !== 'undefined') {
                var text = a.childNodes[5].firstElementChild.innerText;
                contents.push(text);
              }
          }
          return {
            contents: contents
          };
        }).then(function(data) {
          res.render('tpoint', {
            contents: data.contents
          });
          page.close();
          ph.exit();
        });
      });
    });
  });
};
