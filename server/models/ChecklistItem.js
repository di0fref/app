import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const ChecklistItem = db.define('checklist_item', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    done: Sequelize.BOOLEAN,
}, {
    freezeTableName: true
});

export default ChecklistItem
