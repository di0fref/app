import db from "../config/Database.js";
import {Sequelize} from "sequelize";

const ProjectUser = db.define('ProjectUsers', {
    role: Sequelize.STRING,
},{
    timestamps: false
});


export default ProjectUser;



