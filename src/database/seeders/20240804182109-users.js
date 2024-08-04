'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [results] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS count FROM users'
    );

    const count = parseInt(results[0].count, 10);

    if (count === 0) {
      await queryInterface.bulkInsert(
        'users',
        [
          {
            first_name: 'Владислав',
            last_name: 'Власенко',
            birth_date: '1985-01-01',
            company: 'Yandex Group LLC',
            app_using_goal_id: 1,
            job_title: 'BackEnd разработчик',
          },
          {
            first_name: 'Сергей',
            last_name: 'Ткаченко',
            birth_date: '1990-02-02',
            company: 'Mail.ru Corp',
            app_using_goal_id: 2,
            job_title: 'Product Manager',
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
