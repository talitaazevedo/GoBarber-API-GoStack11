import ISendMailDTO from '../dtos/ISendMailDTO';

// Primeiro Criar os models
export default interface IMailProvider {
  // KISS Keep it Simple and Stupid
  sendMail(data: ISendMailDTO): Promise<void>;
}
