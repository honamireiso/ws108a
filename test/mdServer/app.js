const Koa = require('koa');
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const mdit = new MarkdownIt()

const app = module.exports = new Koa();
const path = require('path');
const extname = path.extname;

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path);//檔案路徑
  const fstat = await fs.promises.stat(fpath);//fstat -> 檔案狀態,印出檔案的各種資料
  console.log('fpath=', fpath)
  if (fstat.isFile()) {
    let ext = extname(fpath)//副檔名
    // console.log('ext=', ext)
    if (ext === '.md') {//如果檔案的副檔名是.md
      let md = await fs.promises.readFile(fpath, 'utf8')//把檔案讀成字串再設成 變數md
      let html = mdRender(md)//用mdRender( )回傳結果並設成 變數html
      ctx.type = '.html'//ctx.type描述檔案屬性為 .html
      ctx.body = html//將 變數html 傳回
    } else {
      ctx.type = ext//ctx.type描述檔案屬性 = 檔案的副檔名
      ctx.body = fs.createReadStream(fpath)//讀完檔案用串流方式傳回
    }
  }
})

if (!module.parent) {
  app.listen(3000)
  console.log('server run at http://localhost:3000/')
}

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
