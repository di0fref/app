import Card from "./Card.js";
import User from "./User.js";
import Project from "./Project.js";
import Column from "./Column.js";

Card.belongsTo(User);
Card.belongsTo(Project)
Card.belongsTo(Column)

User.hasMany(Card)
Project.hasMany(Card)

Project.belongsToMany(User, { through: 'ProjectUsers' })
User.belongsToMany(Project, { through: 'ProjectUsers' })

Project.hasMany(Column)
Column.belongsTo(Project)
Column.hasMany(Card)
