import db from "../config/Database.js";
import {Sequelize} from "sequelize";

const CardUser = db.define('CardUsers', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
},{
    timestamps: false,
});


export default CardUser;



