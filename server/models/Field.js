import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const Field = db.define('fields', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    settings: Sequelize.STRING,
    value: Sequelize.STRING
}, {
    freezeTableName: true
});

export default Field
