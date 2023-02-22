import PaperTrail from 'sequelize-paper-trail'
import Card from "../models/Card"
import User from "../models/User"



PaperTrail.init(db).defineModels({
    userMode: User
});


Card.hasPaperTrail()