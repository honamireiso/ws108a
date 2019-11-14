const Koa = require('koa');

const app = module.exports = new Koa();

app.use(async function pageNotFound(ctx) {
  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  ctx.status = 404//status=資料回應,404=找不到該網址
});

if (!module.parent)/*讓別人無法require到3000*/  app.listen(3000);
