import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";

const {DataTypes} = Sequelize;

const Card = db.define('cards', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    due: DataTypes.DATE,
    prio: DataTypes.STRING,
    status: DataTypes.STRING

}, {
    freezeTableName: true
});


export default Card;
