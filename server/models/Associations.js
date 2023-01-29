import Card from "./Card.js";
import User from "./User.js";
import Project from "./Project.js";

Card.belongsTo(User);
Card.belongsTo(Project)

User.hasMany(Card)
Project.hasMany(Card)

Project.belongsToMany(User, { through: 'ProjectUsers' })
User.belongsToMany(Project, { through: 'ProjectUsers' })



// (async () => {
//     await db.sync({ alter: true });
// })();