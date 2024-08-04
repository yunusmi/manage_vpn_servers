import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from './users';

interface ICreateUserAuthAttr {
  user_id: number;
  login: string;
  password: string;
  is_deleted: boolean;
}

@Table({
  tableName: 'user_auth',
  timestamps: false,
})
export class UserAuth extends Model<UserAuth, ICreateUserAuthAttr> {
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
  login: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_deleted: boolean;

  @BelongsTo(() => Users, 'user_id')
  user: Users;
}
