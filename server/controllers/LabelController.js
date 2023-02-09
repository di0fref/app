import Label from "../models/Label.js";

export const addLabel = async (req, res) => {
    try {
        const response = await Label.create(req.body);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
