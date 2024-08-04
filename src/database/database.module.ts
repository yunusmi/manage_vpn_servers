import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AppKeys } from './models/app_keys';
import { AppUsingGoals } from './models/app_using_goals';
import { UserAppActivations } from './models/user_app_activations';
import { UserAuth } from './models/user_auth';
import { UserContacts } from './models/user_contacts';
import { Users } from './models/users';
import { runSeeders } from '@utils/seeders';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        AppKeys,
        AppUsingGoals,
        UserAppActivations,
        UserAuth,
        UserContacts,
        Users,
      ],
      pool: {
        max: 20,
        min: 5,
        acquire: 60000,
        idle: 10000,
      },
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    await runSeeders(this.sequelize);
  }
}
