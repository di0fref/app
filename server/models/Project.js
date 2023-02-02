import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const Project = db.define('projects', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    text: Sequelize.STRING,
    status: Sequelize.STRING,
    color: Sequelize.STRING
}, {
    freezeTableName: true
});

export default Project