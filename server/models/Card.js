import {Sequelize} from "sequelize";
import db from "../config/Database.js";


const Card = db.define('cards', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    text: Sequelize.STRING,
    due: Sequelize.DATE,
    prio: Sequelize.STRING,
    status: Sequelize.STRING,
    position: {
        type: Sequelize.STRING,
        defaultValue: 0
    }

}, {
    freezeTableName: true
});


export default Card;
