import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Card from "./Card.js";



const User = db.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    image: Sequelize.STRING,
    external_id: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    freezeTableName: true
});



export default User;

// (async () => {
//     await db.sync({ alter: true });
// })();
