const Koa = require('koa')
const fs = require('fs')
const MarkdownIt = require('markdown-it')
const mdit = new MarkdownIt()

const app = new Koa()
const path = require('path')

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path)
  const fstat = await fs.promises.stat(fpath)// 讀取檔案狀態
  if (fstat.isFile()) {
    let ext = path.extname(fpath)

    //判斷副檔名是否為md,是的話轉為html,否則以串流方式傳回檔案內容
    if (ext === '.md') {
      let md = await fs.promises.readFile(fpath, 'utf8')
      let html = mdit.render(md)// mdit模組裡面的render函數將括號內的檔案轉檔
      ctx.type = '.html'
      ctx.body = html
    } else {
      ctx.type = ext// ctx是物件,type區塊用以描述檔案屬性
      ctx.body = fs.createReadStream(fpath)// ctx是物件,body區塊用以放置檔案串流
      //此時ctx裡面有type和body區塊
    }
  }
})

app.listen(3000)
console.log('server run at http://localhost:3000/')
