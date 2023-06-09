const express = require("express");
const router = express.Router();
const fs = require("fs");

function readCategoryData() {
    const categoryFile = fs.readFileSync("./data/images.json");
    const categoryData = JSON.parse(categoryFile);
    return categoryData;
}

router.get ("/categories", (req, res) => {
    const categoryData = readCategoryData();

    const allData =  categoryData.map((category) => {
        return {
            id: category.id,
            category: category.category,
            images: category.images
        };
    });
    res.status(200).json(allData);
});

router.get ("/categories/:category", (req, res) => {
    try {
    const categoryData = readCategoryData();

    const individualCategory = categoryData.find((category) => { 
        return category.category.toLowerCase() === req.params.category.toLowerCase()
    });
    
        if (individualCategory) {
        res.status(200).json(individualCategory);
        } else {
            res.status(404).json({error: "Category not found"});
        }
     } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal server error"});
        } 
    });

module.exports = router;