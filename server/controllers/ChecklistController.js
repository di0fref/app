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

        await ChecklistItem.destroy({
            where: {
                checklistId: req.params.id
            }
        })

        await Checklist.destroy({
            where: {
                id: req.params.id
            }
        })
        //
        await Log.create({
            userId: req.user.id,
            field: "Checklist",
            action: "deleted",
            module: "Checklist",
            cardId: list.cardId,
            // checklistId: list.id,
            name: list.name
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
            userId: req.user.id,
            field: "Checklist",
            action: "created",
            module: "Checklist",
            cardId: newList.cardId,
            checklistId: newList.id,
            name: newList.name

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
    try {
        const oldItem = await ChecklistItem.findByPk(req.body.id)
        const listItem = await ChecklistItem.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        const item = await ChecklistItem.findByPk(req.body.id, {
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

        if(oldItem.done && !item.done){
            console.log("Log: Remove completed item")
            await Log.destroy({
                where:{
                    checklistItemId: item.id,
                    action: "completed"
                }
            })
        }

        if (!oldItem.done && item.done) {

            console.log("Log: Add completed item")

            await Log.create({
                userId: req.user.id,
                field: "ChecklistItem",
                action: "completed",
                module: "ChecklistItem",
                cardId: item.checklist.card.id,
                checklistId: item.checklistId,
                checklistItemId: item.id,
                name: item.name
            })
        }


        res.status(200).json(
            item
        );


    } catch (error) {
        console.log(error.message);
    }
}
