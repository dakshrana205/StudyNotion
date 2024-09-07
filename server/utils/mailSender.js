const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,//smtp server used to send mail in gmail
            auth: {
                user: process.env.MAIL_USER,//apni email
                pass: process.env.MAIL_PASS
            }
        });

        const info = await transporter.sendMail({
            from: 'StudyNotion || by Daksh Rana',
            to: email,
            subject: title,
            html: body
        });

        // console.log('Info of sent mail - ', info);
        return info;
    }
    catch (error) {
        console.log('Error while sending mail (mailSender) - ', email);
    }
}

module.exports = mailSender;