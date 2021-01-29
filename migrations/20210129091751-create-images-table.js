'use strict';

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS images (
                id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                guid VARCHAR(255) NOT NULL UNIQUE,
                croppedPicture VARCHAR(255) NOT NULL,
                author VARCHAR(255) NULL,
                camera VARCHAR(255) NULL,
                fullPicture VARCHAR(255) NULL,
                createdAt DATETIME NOT NULL DEFAULT NOW(),
                updatedAt DATETIME NOT NULL
            );
        `);
    },
    async down(queryInterface) {
        return queryInterface.sequelize.query('DROP TABLE IF EXISTS images;');
    }
};
