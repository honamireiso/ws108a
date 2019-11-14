const Koa = require('koa'); // 引用koa套件
const app = module.exports = new Koa(); 

app.use(async function(ctx) { 
  console.log('url=', ctx.url) // 顯示連線網址
  ctx.body = 'Hello World'; // 加入網頁內容
});

if (!module.parent)//防止重複 app.listen(3000); // 聽3000埠
