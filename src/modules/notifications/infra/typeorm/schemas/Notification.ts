import {
  ObjectID,
  Entity,
  CreateDateColumn,
  Column,
  ObjectIdColumn,
} from 'typeorm';

//@Entity('notifications') é como se fosse o nome da tabela no banco
@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID;
  //id: ObjectID; é o ID do mongo
  @Column()
  content: string;

  @Column('uuid')
  recipient_id: string;

  // o valor padrão é definido na aplicação não no mongo
  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Notification;
