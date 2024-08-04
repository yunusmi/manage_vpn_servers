import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from './users';

interface ICreateUserContactsAttr {
  user_id: number;
  phone_number: string;
  email: string;
}

@Table({
  tableName: 'user_contacts',
  timestamps: false,
})
export class UserContacts extends Model<UserContacts, ICreateUserContactsAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  user_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  phone_number: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  email: string;

  @BelongsTo(() => Users, 'user_id')
  user: Users;
}
