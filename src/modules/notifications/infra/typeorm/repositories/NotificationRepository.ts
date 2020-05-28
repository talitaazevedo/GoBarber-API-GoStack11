import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { MongoRepository, getMongoRepository } from 'typeorm';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class NotificationRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;
  constructor() {
    // o segundo parametro é a conexão que desejo utilizar.
    // o default é sempre  o postgres
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }
  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);
    return notification;
  }
}

export default NotificationRepository;
