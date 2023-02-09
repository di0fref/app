import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const Label = db.define('labels', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    color: Sequelize.STRING
}, {
    freezeTableName: true
});

export default Label
