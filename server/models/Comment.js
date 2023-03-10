import {Sequelize} from "sequelize";
import db from "../config/Database.js";


const Comment = db.define('comments', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    text: Sequelize.STRING,

}, {
    freezeTableName: true,
});


export default Comment;
