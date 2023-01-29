import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Project = db.define('projects', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    status: DataTypes.STRING

}, {
    freezeTableName: true
});

export default Project