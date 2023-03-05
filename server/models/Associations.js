import Card from "./Card.js";
import User from "./User.js";
import Project from "./Project.js";
import Column from "./Column.js";
import Label from "./Label.js";
import ProjectField from "./ProjectField.js";
import CardField from "./CardField.js";
import Log from "./Log.js";
import db from "../config/Database.js";
import Checklist from "./Checklist.js";
import ChecklistItem from "./ChecklistItem.js";
import ProjectUsers from "../models/ProjectUsers.js";
import ProjectUser from "../models/ProjectUsers.js";
import Notification from "../models//Notification.js";
import CardMember from "./CardMember.js";

Card.belongsTo(User);
Card.belongsTo(Project)
Card.belongsTo(Column)

User.hasMany(Card)
Project.hasMany(Card)

Project.belongsToMany(User, {through: ProjectUsers, timestamps: false})
User.belongsToMany(Project, {through: ProjectUsers, timestamps: false})

ProjectUser.belongsTo(User, {as: "user", constraints: false})
User.hasMany(ProjectUser, {as: "user", constraints: false})

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

Card.hasMany(Log)
Log.belongsTo(Card)
Log.belongsTo(Column)
Column.hasMany(Log)
Log.belongsTo(User)
User.hasMany(Log)
Project.hasMany(Log)
Log.belongsTo(Project)

Checklist.belongsTo(Card)
Card.hasMany(Checklist)

Checklist.hasMany(ChecklistItem)
ChecklistItem.belongsTo(Checklist)

ProjectUsers.belongsTo(User, {as: "sharedBy"})

Notification.belongsTo(User, {as: "user"})
Notification.belongsTo(User, {as: "userBy"})
Notification.belongsTo(Project)
Notification.belongsTo(Card)
Card.hasMany(Notification)

Project.hasMany(Notification)

User.hasMany(Notification)

Card.hasMany(CardMember)
CardMember.belongsTo(Card)
CardMember.belongsTo(User)
User.hasMany(CardMember)
