import twilio from 'twilio';
export function sendSms(EnvConfig, body, from, to) {
    const accountSid = EnvConfig.accountSid;
    const authToken = EnvConfig.authToken;
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
