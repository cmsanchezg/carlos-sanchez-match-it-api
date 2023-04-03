const express = require("express");
const router = express.Router();
const fs = require("fs");
const { url } = require("inspector");
const { URL } = require("url");
const { v4: uuid } = require("uuid");

function readImagesData() {
    const imagesFile = fs.readFileSync("./data/images.json");
    const imagesData = JSON.parse(imagesFile);
    return imagesData;
}

router.get ("/images", (req, res) => {
    const imagesData = readImagesData();

    const strippedData =  imagesData.map((image) => {
        return {
            id: image.id,
            category: image.category,
            image: image.image,
            description: image.description,
        };
    });
    res.status(200).json(strippedData);
});

router.get ("/images/:id", (req, res) => {
    const imagesData = readImagesData();

    const individualData =  imagesData.find((image) => image.id === req.params.id);
    res.status(200).json(individualData);
});

module.exports = router;