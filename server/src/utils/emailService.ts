import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'support@zielcapital.org',
    pass: 'adminziel',
  },
});

export const sendNotificationEmail = async (subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"Ziel Capital System" <support@zielcapital.org>',
      to: 'support@zielcapital.org',
      subject: subject,
      html: html,
    });
    console.log('Notification email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
};
