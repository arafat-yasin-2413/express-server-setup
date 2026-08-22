import { env } from "../config/env";
import { transporter } from "../config/mail";

interface Options {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html }: Options) => {
    return await transporter.sendMail({
        from: env.smtpFrom, // sender address
        to: to,
        subject: subject, // subject line
        html: html, // HTML body
    });
};
