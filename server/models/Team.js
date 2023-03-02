import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const Team = db.define('teams', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
}, {
    freezeTableName: true
});

export default Team
