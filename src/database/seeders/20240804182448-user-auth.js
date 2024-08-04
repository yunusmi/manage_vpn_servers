'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [results] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) AS count FROM user_auth'
    );

    const count = parseInt(results[0].count, 10);

    if (count === 0) {
      await queryInterface.bulkInsert(
        'user_auth',
        [
          {
            user_id: 1,
            login: 'vlad',
            password: 'hashedpassword1',
            is_deleted: false,
          },
          {
            user_id: 2,
            login: 'sergey_pm',
            password: 'hashedpassword2',
            is_deleted: false,
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_auth', null, {});
  },
};
