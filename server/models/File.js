import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const File = db.define('files', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    filename: Sequelize.STRING,
    mime: Sequelize.STRING,
    size: Sequelize.INTEGER
}, {
    freezeTableName: true
});
export default File
