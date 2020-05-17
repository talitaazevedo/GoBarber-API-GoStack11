// Primeiro Criar os models
export default interface IMailProvider {
  // KISS Keep it Simple and Stupid
  sendMail(to: string, body: string): Promise<void>;
}
