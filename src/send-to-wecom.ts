import request from "axios";
// const config = require('../config');
// import config from '../config';

export default async function sendToWecom(body: {
  text: string;
  wecomCId: string;
  wecomSecret: string;
  wecomAgentId: string;
  wecomTouid?: string;
}): Promise<{ errcode: number; errmsg: string; invaliduser: string }> {
  body.wecomTouid = body.wecomTouid ? "@all" : '';
  const getTokenUrl = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${body.wecomCId}&corpsecret=${body.wecomSecret}`;
  const getTokenRes = await request.get(getTokenUrl);
  const accessToken = getTokenRes.data.access_token;
  if (accessToken && accessToken.length <= 0) {
    throw new Error("获取 accessToken 失败");
  }
  const sendMsgUrl = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`;
  const sendMsgRes = await request.post(sendMsgUrl, {
    touser: body.wecomTouid,
    agentid: body.wecomAgentId,
    msgtype: "text",
    text: {
      content: body.text,
    },
    duplicate_check_interval: 600,
  });
  return sendMsgRes.data;
}

// sendToWecom({
//   text: '推送测试\r\n测试换行',
//   wecomAgentId: config.wecomAgentId,
//   wecomSecret: config.wecomSecret,
//   wecomCId: config.wecomCId,
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
