import keystone from 'keystone';
import sendEmail from '../../../util/send-email';
import contactEmail from '../../../views/email/contact-email';

exports = module.exports = (req, res) => {
  const { enquiry } = req.body;

  saveContactEnquiry(enquiry)
  .then(() => res.json({ error : false }))
  .catch(() => res.json({ false : true }));

  // Alternately, send an email
  // emailContactEnquiry(enquiry)
  // .then(() => res.json({ error : false }))
  // .catch(() => res.json({ false : true }));
}

/**
 * Write enquiry to database
 *
 * @param  {string} subject Subject of the enquiry
 * @param  {string} message Message of the enquiry
 */
const saveContactEnquiry = ({ subject, message }) => new Promise((resolve, reject) => {
  const ContactEnquiry = keystone.list('ContactEnquiry');

  const enquiry = {
    subject,
    message,
    time : (new Date()).toUTCString(),
  };

  const newEnquiry = new ContactEnquiry.model(enquiry);
  newEnquiry.save();
  resolve();
})

/**
 * Send an email containing the enquery
 *
 * @param  {string} subject Subject of the enquiry
 * @param  {string} message Message of the enquiry
 */
const emailContactEnquiry = ({ subject, message }) => new Promise((resolve, reject) => {
  const html = contactEmail(subject, message);

  const mailOptions = (
    process.env.NODE_ENV === 'production' ?
      {
        from   : 'email@test.com',
        to     : 'email@test.com',
        subject: 'A New Enquiry was Submitted',
        html,
      }
    : process.env.NODE_ENV === 'staged' ?
      {
        from   : 'email@test.com',
        to     : process.env.SES_TEST_TO_EMAIL,
        bcc    : process.env.SES_TEST_BCC_EMAIL,
        subject: 'A New Enquiry was Submitted (Staged)',
        html,
      }
    :
      {
        from   : 'email@test.com',
        to     : process.env.SES_TEST_TO_EMAIL,
        bcc    : process.env.SES_TEST_BCC_EMAIL,
        subject: 'A New Enquiry was Submitted (Dev)',
        html,
      }
  );

  sendEmail(mailOptions)
  .then(resolve)
  .catch(err => reject(err));
})
