import nodemailer from 'nodemailer';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    html: string;
    attachments: Attachment[],
}

interface Attachment {
    filename: string;
    path: string;
}

interface EmailServiceConfig {
    service: string;
    auth: {
        user: string;
        pass: string;
    };
}


export class EmailService {

    private transporter;

    constructor(config: EmailServiceConfig) {
        this.transporter = nodemailer.createTransport(config);
    }


    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, html, attachments = [] } = options;

        try {
            const sentInfo = await this.transporter.sendMail(options);

            console.log(sentInfo);



            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    sendEmailWithLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const html = `
        <h3>Logs de sistema - NOC</h3>
        <p>Acá están los logs del servidor mi rey 🗿</p>
        `;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
        ];

        return this.sendEmail({ to, subject, attachments, html });
    }

}