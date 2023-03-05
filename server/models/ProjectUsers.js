import db from "../config/Database.js";
import {Sequelize} from "sequelize";

const ProjectUser = db.define('ProjectUsers', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    role: Sequelize.STRING,
    email: Sequelize.STRING,
    status: Sequelize.STRING,
},{
    timestamps: false,
});


export default ProjectUser;



