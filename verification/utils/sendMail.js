import nodemailer from 'nodemailer'



const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.MAIL_ADRESS,
        pass: process.env.MAIL_PASSWORD
    },
    secure: true
})

export const verificationMail = (email, userName, link) => {
    try {

        const mailOptions = {
            from: process.env.MAIL_ADDRESS,
            to: email,
            subject: 'verify email',
            html: `<p>hi ${userName}\
            please <a href='http://localhost:5000/api/auth/verify/${link}'>clik </a> here
            </p>`

        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error)
            console.log(info)
        })

    } catch (error) {
        console.log(error)
    }
}