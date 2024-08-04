'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [results] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS count FROM app_using_goals'
    );

    const count = parseInt(results[0].count, 10);

    if (count === 0) {
      await queryInterface.bulkInsert(
        'app_using_goals',
        [
          { name: 'Для личного пользования' },
          { name: 'Хочу протестировать новый инструмент' },
          { name: 'Для корпоративного пользования' },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('app_using_goals', null, {});
  },
};
