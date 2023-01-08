import express from 'express';
import Player from "../models/player";
import multer from "multer";
import Upload from "../models/upload";
import path from "path";
import * as fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
const upload = multer({storage: storage});
const router = express.Router()

router.post('/player', async (req, res) => {
    const data = new Player({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        location: req.body.location,
        gender: req.body.gender,
        sports: req.body.sports,
        about: req.body.about,
        interests: req.body.interests,
        team: req.body.team,
        profilePicture: req.body.profilePicture
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        console.error(error)
        res.status(400).json({message: error.message})
    }
})

router.get('/player', async (req, res) => {
    try {
        const data = await Player.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/player/:id', async (req, res) => {
    try {
        const data = await Player.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true};

        const result = await Player.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Delete by ID Method
router.delete('/player/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Player.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.post("/upload", upload.single("profile-picture"), async (req, res) => {

    if (!req.file) {
        console.log("No image!!")
        res.json({
            success: false,
            message: "No image was uploaded"
        });
    } else {
        const obj = {
            fileName: req.file.filename,
            file: {
                data: fs.readFileSync(path.join(appRoot + "/uploads/" + req.file.filename)),
                contentType: "image/png"
            }
        }
        const newImage = new Upload({...obj});
        newImage.save((err, savedImage) => {
            err ? console.log(err) : res.send(savedImage.id)
        });
    }
});

router.get("/images/:imageId", async (req, res) => {
    try {
        const data = await Upload.findById(req.params.imageId);

        res.json(data.file.data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;
