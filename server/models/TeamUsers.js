import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const TeamUser = db.define('team_users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
}, {
    freezeTableName: true
});

export default Team
