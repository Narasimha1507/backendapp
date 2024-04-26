const nodemailer = require('nodemailer');

function generateRandomNumber() {
    // Generate a random number between 0 and 999999
    let randomNumber = Math.floor(Math.random() * 1000000);
  
    // Pad the number with zeros if necessary to ensure it has 6 digits
    let sixDigitNumber = randomNumber.toString().padStart(6, '0');
  
    return sixDigitNumber;
}

// Example usage
let randomSixDigitNumber = generateRandomNumber();

const gmailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rajunarasimha017@gmail.com', //gmail id
        pass: 'clnf obmx mgbc sbmk'  // app password
    }
});


const mailOptions = {
    from: 'rajunarasimha017@gmail.com',
    to: '2200032563@kluniversity.in',
    subject: 'MSWD PROJECT TEST MAIL',
    html: '<font>Your OTP For Kalasthali Online Art Gallery is:<u>' + randomSixDigitNumber + '</u></font>' // Include the randomly generated number here
};


gmailTransporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.error('Error sending email through Gmail:', error.message);
    } else {
        console.log('Email Sent Successfully');
    }
});

module.exports = randomSixDigitNumber
