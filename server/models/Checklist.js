import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const Checklist = db.define('checklist', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
}, {
    freezeTableName: true,
    timestamps: false
});

export default Checklist
