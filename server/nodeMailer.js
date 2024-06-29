const nodemailer = require('nodemailer');
require('dotenv').config();

const nodeMailer = (emailId , fullName) => {
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_APP_USER,
            pass: process.env.GMAIL_APP_PASS
        }
    };
    
    let transporter = nodemailer.createTransport(config);
    
    let message = {
        from: 'devsdev2309@gmail.com',
        to: emailId,
        subject: 'Welcome to DevsDev!',
        html: `
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
            <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <div style="background-color: #4CAF50; color: #ffffff; padding: 10px; text-align: center;">
                    <h1>Welcome to DevsDev!</h1>
                </div>
                <div style="padding: 20px;">
                    <h1 style="color: #333333;">Welcome, ${fullName}!</h1>
                    <p style="color: #555555;">We're excited to have you join the DevsDev community. Here, you can connect with other developers, share your projects, and learn new skills.</p>
                    <h2 style="color: #333333;">Getting Started</h2>
                    <p style="color: #555555;">Here are a few ideas to get you started:</p>
                    <ul style="color: #555555;">
                        <li><b>Explore Projects:</b> Check out the latest projects from our community.</li>
                        <li><b>Join Discussions:</b> Participate in forums and share your knowledge.</li>
                        <li><b>Contribute:</b> Collaborate on open-source projects and improve your skills.</li>
                    </ul>
                    <p style="color: #555555;">We hope you have a great time with us!</p>
                </div>
                <div style="background-color: #f4f4f4; color: #888888; padding: 10px; text-align: center; font-size: 12px;">
                    <p>&copy; 2024 DevsDev. All rights reserved.</p>
                </div>
            </div>
        </body>`
    };

    console.log('email processing')
    transporter.sendMail(message).then((info) => {
        console.log('email sent')
    }).catch((err) => {
        console.error('Error sending email:', err);
    });
};

module.exports = nodeMailer;
