const router = require('express').Router();

const {addCategory, getAllCategories, getCatById, updateCategory, deleteCategory} = require("../controllers/category.js");

router.get("/", getAllCategories);
router.get("/:catId", getCatById);
router.put("/updateCat/:catId", updateCategory);
router.delete("/delCat/:catId", deleteCategory);
router.post("/addCat", addCategory)

module.exports = router;