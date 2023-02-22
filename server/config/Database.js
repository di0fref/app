import {Sequelize} from "sequelize";

const db = new Sequelize('app','root','root',{
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
});



export default db;


try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
