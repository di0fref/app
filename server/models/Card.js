import {Sequelize, DataTypes} from "sequelize";
import db from "../config/Database.js";
import Temporal from "sequelize-temporal"

const Card = db.define('cards', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        number: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            unique: true
        },
        title: Sequelize.TEXT,
        text: Sequelize.TEXT,
        due: Sequelize.DATEONLY,
        prio: Sequelize.STRING,
        status: {
            type: Sequelize.STRING,
            defaultValue: ""
        },
        position: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },

    },
    {
        freezeTableName: true,
        paranoid: true
    },
)
// Temporal(Card, db, {})

export default Card;
