import {Sequelize} from "sequelize";

const db = new Sequelize('app','root','root',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;


try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}