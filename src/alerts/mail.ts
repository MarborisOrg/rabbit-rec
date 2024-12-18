import nodemailer from "nodemailer";

export function sendMail(EnvConfig: Record<string, any>, to: string, subject: string, html: string) {
  console.log("mail send");
  const transporter = nodemailer.createTransport({
    host: EnvConfig.host,
    port: EnvConfig.port,
    secure: EnvConfig.secure,
    // true برای پورت 465 و false برای پورت 587
    // معمولاً 465 برای SSL و 587 برای TLS
    auth: {
      type: "LOGIN",
      user: EnvConfig.auth_user,
      pass: EnvConfig.auth_pass,
    },
    pool: true,
    maxConnections: 10,
  });
  const mailOptions = {
    from: EnvConfig.auth_user,
    to,
    subject,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred: " + error.message);
    }
    console.log("Email sent: " + info.response);
  });
}
