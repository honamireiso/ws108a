const Koa = require('koa');
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const mdit = new MarkdownIt()

const app = module.exports = new Koa();
const path = require('path');
const extname = path.extname;

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path);
  const fstat = await fs.promises.stat(fpath);
  console.log('fpath=', fpath)
  if (fstat.isFile()) {
    let ext = extname(fpath)
    if (ext === '.md') {
      let md = await fs.promises.readFile(fpath, 'utf8')
      let html = mdRender(md)
      ctx.type = '.html'
      ctx.body = html
    } else {
      ctx.type = ext
      ctx.body = fs.createReadStream(fpath)
    }
  }
})

if (!module.parent) {
  app.listen(3000)
  console.log('server run at http://localhost:3000/')
}

// mdRender函數用來加上html的頭尾,此後就可以套上CSS來進行美化
function mdRender(md) {
  return `
<html>
<head>
  <link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body>
  ${mdit.render(md)}
</body>
</html>
  `
}
// 「``」→功能類似「""」,是新語法,裡面可以自動換行,且可允許「 ${} 」插入一段程式碼後執行,執行後的結果就嵌入於此
