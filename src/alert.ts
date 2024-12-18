import { sendMail } from "./alerts/mail.js";
import { ApiBot } from "./alerts/apibot.js";
// import { MidBot } from "./alerts/midbot.js";
import { sendSms } from "./alerts/sms.js";

let apibot: ApiBot;
// let midbot: MidBot;

export async function alertStarter() {
  // midbot = new MidBot();
  apibot = new ApiBot();

  // await midbot.start();
  apibot.start();
}

export function alertCaller(msgContent: any) {
  if (msgContent && typeof msgContent.status === "string") {
    if (msgContent.status === "apibot") {
      apibot.sendMessageToUser(msgContent.id, msgContent.msg);
    } else if (msgContent.status === "mail") {
      sendMail(msgContent.to, msgContent.subject, msgContent.html);
    } else if (msgContent.status === "sms") {
      sendSms(
        msgContent.phone,
        msgContent.patternCode,
        msgContent.vars
      );
    }
  } else {
    console.log("status is not defined or not a string");
  }
}
