import bodyParser from 'body-parser';
import express from 'express';
import { env } from './config/plugins/env.plugins';
import { EmailService } from "./email_service";


const app = express()

const port = env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/send-otp', (req, res) => {

  const name: string | undefined = req.body['name'];
  const email: string | undefined = req.body['email'];
  const otp: string | undefined = req.body['otp'];

  if (!name) {
    res.status(400).send('missing required "name" parameter');
    return;
  }

  if (!email) {
    res.status(400).send('missing required "email" parameter');

    return;
  }

  if (!otp) {
    res.status(400).send('missing required "otp" parameter');
    return;
  }

  sendOtp(name!, otp!, email!)

  res.status(200).send('Email sent');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



const _html = (name: string, otp: string | number) => `
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">IUTV SCAN</a>
    </div>
    <p style="font-size:1.1em">Hi, ${name}</p>
    <p>Use the following OTP to complete the process. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />IUTV SCAN</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>IUTV SCAN Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>
`;

async function sendOtp(name: string, otp: string | number, email: string) {
  const emailService = new EmailService(
    {
      service: env.MAILER_SERVICE,
      auth: {
        user: env.MAILER_EMAIL,
        pass: env.MAILER_SECRET_KEY,
      }
    }
  );

  try {

    await emailService.sendEmail({
      html: _html(name, otp),
      subject: 'Código OTP',
      to: email,
      attachments: [],
    });
    console.log('📨 ✅ Email sent!')
  } catch (error) {
    console.error('❌ Error', error)

  }

};