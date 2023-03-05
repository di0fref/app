import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const Notification = db.define('notifications', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    status: Sequelize.STRING,
    action: Sequelize.STRING
}, {
    freezeTableName: true
});

export default Notification
