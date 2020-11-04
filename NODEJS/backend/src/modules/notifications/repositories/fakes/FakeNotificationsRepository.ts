import { ObjectId } from 'mongodb';
import Notification from "../../infra/typeorm/schemas/Notification";
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

class FakeNotificationsRepository implements INotificationsRepository {

  private notificatons: Notification[] = [];

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {

    const notification = new Notification();

    Object.assign(notification, { id: new ObjectId(), content, recipient_id });

    this.notificatons.push(notification)

    return notification;

  };

}

export default FakeNotificationsRepository;