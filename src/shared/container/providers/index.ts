import IStorageProvider from '../providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import { container } from 'tsyringe';
import IMailProvider from './MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
// Criando a injeção de Dependencia
// container.registerSingleton<IMailProvider>(
//   'MailProvider',
//   ,
// );
