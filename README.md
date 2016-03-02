# local-server

## Develop

```sh
git update-index --skip-worktree views/private.jade
git update-index --skip-worktree routes/private.js
```

```sh
git ls-files -v
> S routes/private.js
> S views/private.jade
```


```sh
npm run-script auto
```

## Reference

- [Express 4 をはじめよう - Qiita](http://qiita.com/hoshi-takanori/items/2128a6cf1dbb533379a2)
- [Express 4 のログ出力とフォームの処理 - Qiita](http://qiita.com/hoshi-takanori/items/7f5602d7fd7ee0fa6427)
- [Node.js で開発環境を整える - Qiita](http://qiita.com/janus_wel/items/b628b457bd2b8c1a84fc)
- [gitignore/Node.gitignore at master · github/gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore)
- [既に git 管理しているファイルをあえて無視したい - Qiita](http://qiita.com/usamik26/items/56d0d3ba7a1300625f92)
