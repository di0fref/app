import {Sequelize} from "sequelize";
import db from "../config/Database.js";


const PendingUser = db.define('pending_users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: Sequelize.STRING,
    status: Sequelize.STRING,
    role: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});


export default PendingUser;
