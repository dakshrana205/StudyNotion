const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // e.g., smtp.gmail.com
            port: 465, // Secure connection port
            secure: true, // Use SSL/TLS for secure connection
            auth: {
                user: process.env.MAIL_USER, // Your email address
                pass: process.env.MAIL_PASS // App password (for Gmail)
            }
        });

        const info = await transporter.sendMail({
            from: process.env.MAIL_USER, // Sender email address
            to: email,
            subject: title,
            html: body
        });

        console.log('Email sent successfully:', info);
        return info;
    } catch (error) {
        console.error('Error while sending mail (mailSender) to', email, error.message);
        throw new Error('Failed to send email');
    }
};

module.exports = mailSender;
