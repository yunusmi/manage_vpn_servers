'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [results] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS count FROM user_contacts'
    );

    const count = parseInt(results[0].count, 10);

    if (count === 0) {
      await queryInterface.bulkInsert(
        'user_contacts',
        [
          {
            user_id: 1,
            phone_number: '+7 89563298',
            email: 'vlad@yandex.ru',
          },
          {
            user_id: 2,
            phone_number: '+7 89563746',
            email: 'sergey.pm@mail.ru',
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_contacts', null, {});
  },
};
