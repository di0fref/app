import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const Log = db.define('logs', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    field: Sequelize.STRING,
    value: Sequelize.STRING,
    module: Sequelize.STRING,
    action: Sequelize.STRING,
    name: Sequelize.STRING
}, {
    freezeTableName: true
});

export default Log
