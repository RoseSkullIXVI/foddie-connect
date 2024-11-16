import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { Credentials } from '../Entities/credentials.entity';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class CredentialsSubscriber implements EntitySubscriberInterface<Credentials> {
  listenTo() {
    return Credentials;
  }

  async beforeInsert(event: InsertEvent<Credentials>) {
    const { Email, Password } = event.entity;

    // Lowercase the email
    event.entity.Email = Email.toLowerCase();

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt();
    event.entity.salt = salt;
    event.entity.Password = await bcrypt.hash(Password, salt);
  }
}
