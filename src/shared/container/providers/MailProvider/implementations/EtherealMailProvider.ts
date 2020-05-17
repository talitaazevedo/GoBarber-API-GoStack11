// https://ethereal.email fake user repository
// 2 Criar o fake  porque ainda não se sabe qual serviço utilizar.

import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

//  Esse fake não faz nada.
// Só testa se senviou algo para a variável.

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    // jeito antigo de se fazer sem usar await
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }
  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe GoBarger <equipe@gobarber.com>',
      to,
      subject: 'Recuperação de senha ✔',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
