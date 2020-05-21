import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config();
export const options = {
  host: `${process.env.EMAIL_HOST}`,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: `${process.env.EMAIL_ID}`,
    pass: `${process.env.EMAIL_PASS}`
  }
};

export const gmailOptions = {
  service: 'gmail',
  auth: {
    user: `${process.env.GMAIL_USERNAME}`,
    pass: `${process.env.GMAIL_PASSWORD}`
  }
};

export const transporter = nodemailer.createTransport(options);
export const gmailTransporter = nodemailer.createTransport(gmailOptions);
