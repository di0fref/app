import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Card from "./Card.js";

const {DataTypes} = Sequelize;

const User = db.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    external_id: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: true
});

export default User;

// (async () => {
//     await db.sync({ alter: true });
// })();