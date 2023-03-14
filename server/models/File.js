import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const File = db.define('files', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    mime_type: Sequelize.STRING,
    size: Sequelize.INTEGER

}, {
    freezeTableName: true
});

export default File
