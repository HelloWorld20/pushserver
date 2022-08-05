import Koa from "koa";
import Router from "@koa/router";

const config = require('../config');


import sendToWecom from "./send-to-wecom";

const app = new Koa();

const rootRouter = new Router();

app.use(rootRouter.routes());

app.use(async (ctx) => {
  let text = ctx.request.query.text;
  const cid = ctx.request.query.cid;
  //   if (!text) throw Boom.badRequest("需要传递text参数");

  if (Array.isArray(text)) {
    text = text[0]
  }

  const result = await sendToWecom({
    text: text ? text : "推送测试\r\n测试换行",
    wecomAgentId: config.wecomAgentId,
    wecomSecret: config.wecomSecret,
    wecomCId: config.wecomCId + cid,
  }).catch((err) => {
    console.log(
      "%c [ err ]-29",
      "font-size:13px; background:pink; color:#bf2c9f;",
      err
    );
    console.log(err);
  });

  ctx.body = JSON.stringify(result);
});

app.listen(config.port, () => {
  console.log("server is running in " + config.port);
});
