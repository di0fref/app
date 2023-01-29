import Card from "../models/Card.js";

export const getCards = async (req, res) => {
    try {
        const response = await Card.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateCard = async (req, res) => {
    try {
        const response = await Card.update(req.body);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCardById = async (req, res) => {
    try {
        const response = await Card.findAll({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const createCard = async (req, res) => {
    console.log(req.body);
    try {
        await Card.create(req.body);
        res.status(201).json({msg: "Card Created"});
    } catch (error) {
        console.log(error.message);
    }
}