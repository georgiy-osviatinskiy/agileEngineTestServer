'use strict';

module.exports = {
    async up(queryInterface) {
        return queryInterface.sequelize.query(`
            CREATE TABLE IF NOT EXISTS imageTags (
                id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                imageId INTEGER UNSIGNED NOT NULL,
                tagId INTEGER UNSIGNED NOT NULL,
                createdAt DATETIME NOT NULL DEFAULT NOW(),
                updatedAt DATETIME NOT NULL,
            
                CONSTRAINT imageTagsImageIdFk FOREIGN KEY(imageId) REFERENCES images(id),
                CONSTRAINT imageTagsTagIdFk FOREIGN KEY (tagId) REFERENCES tags(id)
            );
        `);
    },
    async down(queryInterface) {
        return queryInterface.sequelize.query('DROP TABLE IF EXISTS imageTags;');
    }
};
