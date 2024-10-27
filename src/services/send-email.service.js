import nodemailer from "nodemailer";

/**
 * @param {object} params - object of email params
 * @returns {Promise} - Promise object represents the info of the sent email
 * @description - Send email service
 */
export const sendEmailService = async ({
  to,
  subject = "No Reply",
  textMessage = "",
  htmlMessage = "",
  attachments = [],
} = {}) => {
  // configer email ( transporter)
  const transporter = nodemailer.createTransport({
    host: "localhost", // smtp.gmail.com
    port: 465, //587,25
    secure: true, // true , false
    auth: {
      user: "", // app
      pass: "", // app-password
    },
  });
  // configer message ( mail )
  const info = await transporter.sendMail({
    from: "No Reply <ahmede2003519@gmail.com>",
    to,
    subject,
    text: textMessage,
    html: htmlMessage,
    attachments,
  });
  
  return info;
};
