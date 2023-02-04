import {Sequelize, DataTypes} from "sequelize";
import db from "../config/Database.js";


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
        // columnTitle: {
        //     type: Sequelize.STRING,
        //     set(value) {
        //         this.setDataValue("columnTitle", this.getColumn().then(col => col.title))
        //
        //     },
        // },
        title: Sequelize.TEXT,
        text: Sequelize.TEXT,
        due: Sequelize.DATE,
        prio: Sequelize.STRING,
        status: Sequelize.STRING,
        position: {
            type: Sequelize.STRING,
            defaultValue: 0
        }

    },
    {freezeTableName: true},
)


export default Card;
