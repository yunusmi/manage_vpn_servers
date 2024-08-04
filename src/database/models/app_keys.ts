import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { UserAppActivations } from './user_app_activations';

interface ICreateAppKeysAttr {
  key: string;
  valid_till: string;
  issue_date: string;
  issue_time: string;
}

@Table({
  tableName: 'app_keys',
  timestamps: false,
})
export class AppKeys extends Model<AppKeys, ICreateAppKeysAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  key: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  valid_till: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  issue_date: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  issue_time: string;

  @HasOne(() => UserAppActivations, 'app_key_id')
  activation: UserAppActivations;
}
