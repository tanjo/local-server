module.exports = function(req, res) {
  var RSS = require('rss');
  var feed = new RSS({
    title: 'local-server',
    description: 'ローカルサーバーの更新情報',
    feed_url: 'http://localhost:3000/rss.xml',
    site_url: 'http://localhost:3000/',
  });

  feed.item({
    title: 'T-site のチェック',
    description: 'RSS つけてくれよほんと',
    url: 'http://localhost:3000/tpoint',
    pubDate: new Date(2016, 3 - 1, 14, 13, 01).toUTCString()
  });

  feed.item({
    title: '株価機能追加',
    description: '保有株のデータ表示',
    url: 'http://localhost:3000/kabu',
    pubDate: new Date(2016, 3 - 1, 9, 11, 57).toUTCString()
  });

  feed.item({
    title: 'Daily ページを追加',
    description: '今のところ特に日課にしているものはないけどあったら便利そうだなぁという勝手な妄想で追加した.<br>たぶん年間予定表とかもあると便利そうだ.',
    url: 'http://localhost:3000/daily',
    pubDate: new Date(2016, 3 - 1, 8, 17, 6).toUTCString()
  });

  feed.item({
    title: 'RSS 機能の追加',
    description: '<a href="https://www.npmjs.com/package/rss">rss</a> を利用した RSS 機能が追加されました.',
    url: 'http://localhost:3000/rss.xml',
    pubDate: new Date(2016, 3 - 1, 8, 16, 19).toUTCString()
  });

  res.set('Content-Type', 'text/xml');
  res.send(feed.xml());
};
