import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const Log = db.define('logs', {
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

export default Log
