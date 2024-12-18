import { sendMail } from "./alerts/mail.js";
import { ApiBot } from "./alerts/apibot.js";
import { MidBot } from "./alerts/midbot.js";
import { sendSms } from "./alerts/sms.js";

let apibot: ApiBot;
let midbot: MidBot;

export async function alertStarter(EnvConfig: Record<string, any>) {
  midbot = new MidBot();
  apibot = new ApiBot();

  await midbot.start(EnvConfig);
  apibot.start(EnvConfig);
}

export function alertCaller(EnvConfig: Record<string, any>, msgContent: any) {
  if (msgContent && typeof msgContent.status === "string") {
    if (msgContent.status === "apibot") {
      apibot.sendMessageToUser(msgContent.id, msgContent.msg);
    } else if (msgContent.status === "mail") {
      sendMail(EnvConfig, msgContent.to, msgContent.subject, msgContent.html);
    } else if (msgContent.status === "sms") {
      sendSms(
        EnvConfig,
        msgContent.phone,
        msgContent.patternCode,
        msgContent.vars
      );
    }
  } else {
    console.log("status is not defined or not a string");
  }
}
