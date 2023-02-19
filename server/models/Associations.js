import Card from "./Card.js";
import User from "./User.js";
import Project from "./Project.js";
import Column from "./Column.js";
import Label from "./Label.js";
import ProjectField from "./ProjectField.js";
import CardField from "./CardField.js";

Card.belongsTo(User);
Card.belongsTo(Project)
Card.belongsTo(Column)

User.hasMany(Card)
Project.hasMany(Card)

Project.belongsToMany(User, {through: 'ProjectUsers', timestamps: false})
User.belongsToMany(Project, {through: 'ProjectUsers', timestamps: false})

Project.hasMany(Column)
Column.belongsTo(Project)
Column.hasMany(Card)

Project.hasMany(Label)
Label.belongsTo(Project)
Label.belongsToMany(Card, {through: 'CardLabels', timestamps: false})
Card.belongsToMany(Label, {through: 'CardLabels', timestamps: false})


ProjectField.belongsTo(Project)
Project.hasMany(ProjectField)

CardField.belongsTo(ProjectField)
CardField.belongsTo(Card)
Card.hasMany(CardField)
