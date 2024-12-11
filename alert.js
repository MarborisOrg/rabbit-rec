export function alertCaller(msgContent) {
    if (msgContent && typeof msgContent.item_id === 'string') {
        console.log(msgContent.item_id);
    }
    else {
        console.log('item_id is not defined or not a string');
    }
}
