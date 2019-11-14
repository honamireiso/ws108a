const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

app.use(serve(__dirname + '/public'));//確認檔案路徑

app.listen(3000);

console.log('listening on port 3000');
