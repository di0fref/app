import {Sequelize} from "sequelize";
import db from "../config/Database.js";


const Column = db.define('columns', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    order: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    freezeTableName: true
});


export default Column;
