const router = require('express').Router();
const {getAllProducts, getProductById, getAllFeatured} = require("../controllers/product.js")

router.get('/', getAllProducts);
router.get('/featured', getAllFeatured)
router.get('/:productId', getProductById);

module.exports = router;