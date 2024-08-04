import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AppUsingGoals } from './app_using_goals';

interface ICreateUserAttr {
  first_name: string;
  last_name: string;
  birth_date: string;
  company: string;
  app_using_goal_id: number;
  job_title: string;
}

@Table({
  tableName: 'users',
  timestamps: false,
})
export class Users extends Model<Users, ICreateUserAttr> {
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
  })
  first_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  birth_date: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  company: string;

  @ForeignKey(() => AppUsingGoals)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  app_using_goal_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  using_goal: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  job_title: string;

  @BelongsTo(() => AppUsingGoals, 'app_using_goal_id')
  app_using_goal: AppUsingGoals;
}
