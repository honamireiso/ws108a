const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const path = require('path')

app.use(async function(ctx) {
  const fpath = path.join(__dirname, ctx.path)//有看不懂的地方就"印"!
  console.log('看看__dirname=', __dirname)// dirname就是根目錄
  console.log('看看fpath=', fpath)// fpath就是file path檔案路徑,檔案路徑是__dirname跟ctx.path連接起來的結果
  const fstat = await fs.promises.stat(fpath)
  console.log('看看fstat=', fstat)//file state檔案狀態,會印出一大堆的檔案資料
  if (fstat.isFile()) {
    let type = path.extname(fpath)
    console.log('看看type=', type)//type是檔案類型(副檔名)
    ctx.type = type
    console.log('看看ctx.type=', ctx.type)//ctx.type會把檔案類型告知瀏覽器,否則類型錯誤可能變成亂碼
    ctx.body = fs.createReadStream(fpath)// 讀完檔案用串流方式傳回,可以節省記憶體
  }
})

app.listen(3000)
console.log('server run at http://localhost:3000/')

