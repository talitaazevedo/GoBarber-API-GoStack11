// 2 Criar o fake  porque ainda não se sabe qual serviço utilizar.

import IMailProvider from '../models/IMailProvider';

//  Esse fake não faz nada.
// Só testa se senviou algo para a variável.

interface IMessage {
  to: string;
  body: string;
}
export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];
  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}
