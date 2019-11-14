const Koa = require('koa'); // 引用koa套件
const app = module.exports = new Koa(); 

app.use(async function(ctx) { // koa.use 是非同步函式
  console.log('url=', ctx.url) // 紀錄連線網址
  ctx.body = 'Hello World'; // 加入網頁內容
});

if (!module.parent)//防止重複 app.listen(3000); // 聽3000埠
