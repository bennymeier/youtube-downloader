import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, 
    port: 993,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PW,
    },
});

const mailOptions = {
    from: `"YouTubdle.com" ${process.env.MAIL_USER}`,
    to: "meier.benjamin@web.de",
    subject: "YouTubdle.com Form",
    text: "Hier könnten die Daten deines Formulars stehen",
    // html: "<b>Hier könnten die Daten deines Formulars stehen</b>",
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(`Error: ${error}`);
    }
    console.log(`Message sent: ${info.response}`);
});
