import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const ProjectField = db.define('project_fields', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    type: Sequelize.STRING,
}, {
    freezeTableName: true,
    timestamps: false
});

export default ProjectField
