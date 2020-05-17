// 2 Criar o fake  porque ainda não se sabe qual serviço utilizar.

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

//  Esse fake não faz nada.
// Só testa se senviou algo para a variável.

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];
  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
