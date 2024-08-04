import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Users } from './users';

interface ICreateAppUsingGoalsAttr {
  name: string;
}

@Table({
  tableName: 'app_using_goals',
  timestamps: false,
})
export class AppUsingGoals extends Model<
  AppUsingGoals,
  ICreateAppUsingGoalsAttr
> {
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
  name: string;

  @HasMany(() => Users, 'app_using_goal_id')
  user_goals: Users[];
}
