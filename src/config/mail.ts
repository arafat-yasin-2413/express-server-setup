import { env } from "./env";

import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: Number(env.smtpPort),
  secure: Number(env.smtpPort) === 465, // true for only port: 465
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass,
  },
});

// port 465 - secure : true
// port 587 - secure : false