import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const CardField = db.define('card_fields', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    value: Sequelize.STRING,
    // options: Sequelize.STRING,
    // type: Sequelize.STRING
}, {
    freezeTableName: true,
    timestamps: false
});

export default CardField
