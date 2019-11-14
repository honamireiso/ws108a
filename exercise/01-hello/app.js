const Koa = require('koa'); // 引用koa套件
const app = module.exports = new Koa(); // 建立模組為一個新Koa物件

app.use(async function(ctx) { // koa.use 是非同步函式
  console.log('url=', ctx.url) // 紀錄連線網址
  ctx.body = 'Hello World'; // 加入網頁內容
});

if (!module.parent) app.listen(3000); // 當不是被引用，監聽3000埠
