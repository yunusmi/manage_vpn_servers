import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from './users';
import { AppKeys } from './app_keys';

interface ICreateUserAppActivationsAttr {
  user_id: number;
  finger_print: string;
  app_key_id: number;
  activation_date: string;
  activation_time: string;
}

@Table({
  tableName: 'user_app_activations',
  timestamps: false,
})
export class UserAppActivations extends Model<
  UserAppActivations,
  ICreateUserAppActivationsAttr
> {
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
  finger_print: string;

  @ForeignKey(() => AppKeys)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  app_key_id: number;

  @BelongsTo(() => Users, 'user_id')
  user: Users;

  @BelongsTo(() => AppKeys, 'app_key_id')
  app_key: AppKeys;
}
