import { ApiBot } from "./alert/rabbit.alert.telegram.apibot.service.js";
import { MidBot } from "./alert/rabbit.alert.telegram.mtp.service.js";

let apibot
let midbot

export async function alertStarter(EnvConfig){
    midbot = new MidBot()
    apibot = new ApiBot()

    await midbot.start(EnvConfig)
    apibot.start(EnvConfig)
}

export function alertCaller(msgContent) {
    if (msgContent && typeof msgContent.item_id === 'string') {
        console.log(msgContent.item_id);
    }
    else {
        console.log('item_id is not defined or not a string');
    }
}
