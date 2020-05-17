import { container } from 'tsyringe';

import IStorageProvider from '../providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
// Criando a injeção de Dependencia
container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
