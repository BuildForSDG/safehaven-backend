/* eslint-disable consistent-return */
import dotEnv from 'dotenv';
import { transporter, gmailTransporter } from '../config/nodemailer-config';

dotEnv.config();
const verificationEmail = (link) => `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>safeHaven</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
      <style>
          * {
              font-family: 'Poppins', sans-serif;
          }
          .container {
              width: 70%;
              padding: 2%;
              text-align: center;
              margin: 1rem auto;
              background: #000;
              color: #fff;
              border-radius: 2rem;
          }
          a {
              display: block;
              background-color: #00BF00;
              padding: 2%;
              width: 60%;
              margin: 3rem auto;
          }
          p {
              margin-bottom: 2rem;
          }
          .enquiry {
              padding-top: 1rem;
              border-top: solid 1px #fff;
              width: 70%;
              margin: auto;
          }
          .heading {
              font-size: 2rem;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <p class="heading">We are very excited to begin this journey with you!</p>
          <p>Kindly verify your email by clicking the link below.</p>
          <a style="color:#ffffff; text-decoration: none;" href='${link}'>Verify</a>
          <p class="enquiry">Send a mail to <b>support@safehaven.com</b> for enquiries</p>
          <img src="https://res.cloudinary.com/aoimageupload/image/upload/v1589449968/White_Logo_1.svg" alt="logo" />
      </div>
  </body>
  </html>`;

const SendMail = (to, token) => {
  const hostUrl = `${process.env.HOST_URL}`;
  const mailOptions = {
    from: 'ayooluwa.olosunde@gmail.com',
    to,
    subject: 'Welcome To SafeHaven',
    html: verificationEmail(`${hostUrl}/api/v1/auth/verification/${token}/${to}`)
  };

  gmailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return 'error sending verification';
    }
    console.log(`Email sent: ${info.response}`);
  });
};

const sendForgotPasswordMail = (to, token, id) => {
  const hostUrl = process.env.HOST_URL;
  const mailOptions = {
    from: 'admin@jointtaskfoundation.com',
    to,
    subject: 'Your Password Reset Link is Here',
    text: `Hi, \n\nThis Link expires in the next 1 hour\nClick on this link to reset your password ${hostUrl}/api/v1/auth/verifypassword/${token}/${to}/${id}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return 'error sending verification';
    }
    console.log(`Email sent: ${info.response}`);
  });
};

const SendAnyMail = (to, subject, message) => {
  const mailOptions = {
    from: 'admin@jointtaskfoundation.com',
    to,
    subject,
    text: `${message}, \n check your profile or dashboard to see the details \n Let us build wealth together`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return 'error sending verification';
    }
    console.log(`Email sent: ${info.response}`);
  });
};

// contact us email
const SendContactEmail = (name, body, phone, email) => {
  const mailOptions = {
    from: 'admin@jointtaskfoundation.com',
    to: 'admin@jointtaskfoundation.com',
    subject: `Message From ${name}`,
    text: `${body} \nemail: ${email} \nphone: ${phone}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return ('error sending verification');
    }
    console.log(`Email sent: ${info.response}`);
  });
};

export {
  SendMail, sendForgotPasswordMail, SendAnyMail, SendContactEmail
};
