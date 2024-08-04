import { basename, join } from 'path';
import { Sequelize } from 'sequelize-typescript';
import { readdirSync } from 'fs';
import { Logger } from '@nestjs/common';

const logger = new Logger('Seeders');

const SEEDER_DIR = join(__dirname, '..', '..', '..', 'src/database/seeders');

const SEEDER_PATHS = readdirSync(SEEDER_DIR)
  .filter((file) => file.endsWith('.js'))
  .map((file) => join(SEEDER_DIR, file));

export async function runSeeders(sequelize: Sequelize) {
  logger.log('Начало запуска миграции');
  for (const seederPath of SEEDER_PATHS) {
    const fileName = basename(seederPath);
    logger.log(`Запуск seeder-а: ${fileName}`);
    try {
      const seeder = require(seederPath);
      await seeder.up(sequelize.getQueryInterface(), Sequelize);
      logger.log(`Seeder успешно выполнен ${fileName}`);
    } catch (error) {
      logger.error(`Ошибка при выполнении seeder-a ${fileName}:`, error);
    }
  }
}
