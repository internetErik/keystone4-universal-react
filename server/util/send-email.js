import nodemailer from 'nodemailer';
import aws from 'aws-sdk';

/**
 * Send an email with SES based on options passed in.
 *
 * @param  {Object}  emailOptions 'nodemailer' options
 * @return {Promise}
 */
const sendEmail = emailOptions => new Promise((resolve, reject) => {
  // create Nodemailer SES transporter
  const transporter = nodemailer.createTransport({
    SES: new aws.SES({
      apiVersion     : '2010-12-01',
      accessKeyId    : process.env.SES_KEY,
      secretAccessKey: process.env.SES_SECRET,
      region         : process.env.SES_REGION,
    })
  });

  // send some mail
  transporter.sendMail(emailOptions, (err, info) => {
    const res = { success: true };

    if(err) {
      console.error(err);
      res.success = false;
      reject(err);
    }

    if(process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'staged') {
      console.log(info.envelope);
      console.log(info.messageId);
    }

    resolve(res);
  });
});

export default sendEmail;
