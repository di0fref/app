import Checklist from "../models/Checklist.js";
import ChecklistItem from "../models/ChecklistItem.js";
import Card from "../models/Card.js"
import Log from "../models/Log.js";


export const deleteChecklistItem = async (req, res) => {

    try {

        const item = await ChecklistItem.findByPk(req.params.id, {
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

        await ChecklistItem.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json(item);

    } catch (error) {
        console.log(error.message);
    }
}
export const deleteChecklist = async (req, res) => {

    try {

        const list = await Checklist.findByPk(req.params.id, {
            include: [
                {
                    model: Card,
                    attributes: ["id", "columnId"]
                },
                {
                    model: ChecklistItem
                }
            ],
        })

        await Checklist.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).json(list);

    } catch (error) {
        console.log(error.message);
    }
}

export const addChecklist = async (req, res) => {

    try {
        const list = await Checklist.create(req.body)

        const newList = await Checklist.findByPk(list.id, {
            include: [
                {
                    model: Card,
                    attributes: ["id", "columnId"]
                },
                {
                    model: ChecklistItem
                }
            ],
        })

        await Log.create({
            field: "Checklist",
            action: "Added",
            module: "Checklist",
            cardId: newList.cardId,
            checklistId: newList.id
        })

        res.status(200).json(newList);

    } catch (error) {
        console.log(error.message);
    }
}

export const addCheckItem = async (req, res) => {

    try {
        const listItem = await ChecklistItem.create(req.body)

        res.status(200).json(await ChecklistItem.findByPk(listItem.id, {
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
        }));

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

        // if (req.body.done) {
        //     Log.create({
        //         field: "Checklist",
        //         action: "Added",
        //         module: "ChecklistItem",
        //         cardId: req.body.cardId,
        //         checklistId: req.body.id,
        //         checklistItemId: listItem.id
        //     })
        // }


        res.status(200).json(
            await ChecklistItem.findByPk(req.body.id, {
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
