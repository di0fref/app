import Checklist from "../models/Checklist.js";
import ChecklistItem from "../models/ChecklistItem.js";
import Card from "../models/Card.js"
export const addChecklist = async (req, res) => {

    try {
        const list = await Checklist.create(req.body)
        res.status(200).json(list);

    } catch (error) {
        console.log(error.message);
    }
}

export const addCheckItem = async (req, res) => {

    try {
        const listItem = await ChecklistItem.create(req.body)

        res.status(200).json(listItem);

    } catch (error) {
        console.log(error.message);
    }
}

export const updateCheckItem = async (req, res) => {
    console.log(req.body)
    try {
        const listItem = await ChecklistItem.update(req.body, {
            where: {
                id: req.body.id
            }
        })

        res.status(200).json(
            await ChecklistItem.findByPk(req.body.id,{
                include: [{
                    model: Checklist,
                    attributes: ["id"],
                    include: [
                        {
                            model: Card,
                            attributes: ["id", "columnId"]
                        }
                    ]
                }]
            })
        );

    } catch (error) {
        console.log(error.message);
    }
}
