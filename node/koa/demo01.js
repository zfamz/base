const Koa = require('koa')
const app = new Koa()
const port = 3000

app.use(async (ctx, next) => {
  let stime = Date.now()
  await next()
  let etime = Date.now()
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>hello world<h1>'
  console.log(`url: ${ctx.path}, respones time: ${etime - stime}ms`)
})

app.use(async (ctx, next) => {
  console.log('middleware 1 doing something')
  await next()
  console.log('middleware 1 end')
})
app.use(async (ctx, next) => {
  console.log('middleware 2 doing something')
  await next()
  console.log('middleware 2 end')
})
app.use(async (ctx, next) => {
  console.log('middleware 3 doing something')
  await next()
  console.log('middleware 3 end')
})

app.listen(port, () => {
  console.log('Server is running at my:', port)
})
