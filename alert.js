import { ApiBot } from "./alert/rabbit.alert.telegram.apibot.service.js";
import { MidBot } from "./alert/rabbit.alert.telegram.mtp.service.js";

let apibot;
let midbot;

export async function alertStarter(EnvConfig) {
  midbot = new MidBot();
  apibot = new ApiBot();

  await midbot.start(EnvConfig);
  apibot.start(EnvConfig);
}

export function alertCaller(msgContent) {
  if (msgContent && typeof msgContent.status === "string") {
    if(msgContent.status === 'apibot'){
        console.log(msgContent.status);
        console.log(msgContent.msg);
        console.log(msgContent.id);
    
        apibot.sendMessageToUser(msgContent.id, msgContent.msg);
    }
    
  } else {
    console.log("status is not defined or not a string");
  }
}
