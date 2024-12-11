import nodemailer from 'nodemailer';
export function sendMail(to, subject, text) {
    const transporter = nodemailer.createTransport({
        host: $.env.config.host,
        port: $.env.config.port,
        secure: $.env.config.secure,
        auth: {
            user: $.env.config.auth_user,
            pass: $.env.config.auth_pass,
        },
    });
    const mailOptions = {
        from: $.env.config.auth_user,
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
