import nodemailer from "nodemailer";

export function sendMail(to: string, subject: string, html: string) {
  console.log("info: Mail Send..");
  const transporter = nodemailer.createTransport({
    host: configs.EnvConfig.host,
    port: configs.EnvConfig.port,
    secure: configs.EnvConfig.secure,
    // true برای پورت 465 و false برای پورت 587
    // معمولاً 465 برای SSL و 587 برای TLS
    auth: {
      type: "LOGIN",
      user: configs.EnvConfig.auth_user,
      pass: configs.EnvConfig.auth_pass,
    },
    pool: true,
    maxConnections: 10,
  });
  const mailOptions = {
    from: configs.EnvConfig.auth_user,
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred: " + error.message);
    }
    console.log("Success: Email sent: " + info.response);
  });
}
