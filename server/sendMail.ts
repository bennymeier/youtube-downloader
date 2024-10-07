import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
}

export async function sendMail(mailOptions: MailOptions) {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PW,
        },
    });

    try {
        let info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending mail:', error);
        return { success: false, error };
    }
}
