import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    requireTLS : true,
    logger : true, 
    debug: true,
    auth: {
        user: process.env.BREVO_SMTP_USER, // always "apikey"
        pass: process.env.BREVO_SMTP_KEY,
    },
}) 