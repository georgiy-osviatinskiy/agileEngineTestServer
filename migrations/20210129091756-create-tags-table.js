'use strict';

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS tags (
                id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL UNIQUE,
                createdAt DATETIME NOT NULL DEFAULT NOW(),
                updatedAt DATETIME NOT NULL
            );
        `);
    },
    async down(queryInterface) {
        return queryInterface.sequelize.query('DROP TABLE IF EXISTS tags;');
    }
};
