const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const path = require('path')

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path)
  console.log('__dirname=', __dirname)// dirname根目錄
  console.log('fpath=', fpath)//file path檔案路徑
  const fstat = await fs.promises.stat(fpath)
  console.log('fstat=', fstat)//file state檔案狀態
  if (fstat.isFile()) {
    let type = path.extname(fpath)
    console.log('type=', type)//type是檔案類型
    ctx.type = type
    console.log('ctx.type=', ctx.type)//把檔案類型告知瀏覽器
    ctx.body = fs.createReadStream(fpath)// 讀完檔案用串流方式傳回
  }
})

app.listen(3000)
console.log('server run at http://localhost:3000/')

