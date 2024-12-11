import twilio from 'twilio';
export function sendSms(body, from, to) {
    const accountSid = $.env.config.accountSid;
    const authToken = $.env.config.authToken;
    const client = twilio(accountSid, authToken);
    client.messages
        .create({
        body,
        from,
        to,
    })
        .then((message) => console.log('Message sent: ' + message.sid))
        .catch((error) => console.error('Error occurred: ' + error.message));
}
