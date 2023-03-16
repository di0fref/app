import express from "express";
import multer from "multer";
import {
    createCard,
    getCards, updateCard, reorderCards,
    addLabel, removeLabel, getCardsByIds, updateField, archiveCards, getCard, deleteCard, addComment,
    deleteComment
} from "../controllers/CardController.js";
import File from "../models/File.js";
import fs from "fs"

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

function fileFilter(req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    // To reject this file pass `false`, like so:
    // cb(null, false)

    // // To accept the file pass `true`, like so:
    cb(null, true)
    //
    // // You can always pass an error if something goes wrong:
    // cb(new Error('I don\'t have a clue!'))

}

const router = express.Router();

router.get('/cards', getCards);
router.get('/cards/:id', getCard);

// router.get('/users/:id', getUserById);
router.post('/cards', createCard);
router.put('/cards', updateCard);
router.post('/cards/reorder', reorderCards);
router.post('/cards/addlabel', addLabel);
router.post('/cards/removelabel', removeLabel);
router.post('/cards/get', getCardsByIds);
router.put('/cards/field/update', updateField);
router.post('/cards/archive', archiveCards);
router.delete("/cards/:id", deleteCard)
router.post('/cards/comment/add', addComment);
router.post('/cards/comment/delete', deleteComment);


router.get("/cards/file/delete/:id", async (req, res) => {

    await File.destroy({
        where: {
            id: req.params.id
        }
    })

    fs.unlink("public/uploads/" + req.params.id, (err) => {
        console.log(err);
    });

    res.status(200).json("ok");
})
router.get("/cards/file/download/:id", async (req, res) => {

    console.log("/cards/file/download/:id");

    const file = await File.findByPk(req.params.id)
    res.download('public/uploads/' + req.params.id, (err) => {
        if (err) {
            console.log("Error", err)
        }
    })
})
router.post("/cards/file/upload", upload.single('file'), async (req, res) => {
    console.log("/cards/file/upload");

    try {
        const file = await File.create({
            id: req.file.filename,
            cardId: req.body.cardId,
            filename: req.file.originalname,
            userId: req.body.userId,
            mime: req.file.mimetype,
            size: req.file.size
        })
        res.status(200).json(file);

    } catch (error) {
        console.log(error.message);
    }
})


// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
