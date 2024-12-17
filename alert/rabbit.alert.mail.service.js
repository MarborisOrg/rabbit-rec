import nodemailer from 'nodemailer';
export function sendMail(EnvConfig, to, subject, text) {
    const transporter = nodemailer.createTransport({
        host:EnvConfig.host,
        port:EnvConfig.port,
        secure:EnvConfig.secure,
        auth: {
            user:EnvConfig.auth_user,
            pass:EnvConfig.auth_pass,
        },
    });
    const mailOptions = {
        from:EnvConfig.auth_user,
        to,
        subject,
        text,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred: ' + error.message);
        }
        console.log('Email sent: ' + info.response);
    });
}
