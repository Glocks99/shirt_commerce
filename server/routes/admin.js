const router = require('express').Router();
const {createProduct, deleteAllProducts,deleteUserById, deleteProductById, updateProductById,updateUserById, getAllUsers, getUserById, getProductsCount, getUserCount} = require("../controllers/adminController.js");
const multer = require("multer");

const MIMETYPE_MAP = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/gif': '.gif',
  'image/webp': '.webp',
  'image/svg+xml': '.svg',
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = MIMETYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads/products')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = MIMETYPE_MAP[file.mimetype]
    cb(null, fileName + '-' + Date.now() + extension)
  }
})

const uploadOptions = multer({ storage: storage })

router.get('/users', getAllUsers);
router.get('/users/:userId', getUserById);
router.delete('/users/:userId', deleteUserById);
router.put('/users/:userId', updateUserById);
router.post('/addProduct', uploadOptions.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]), createProduct);
router.get('/products/count', getProductsCount);
router.put('/products/:productId', updateProductById);
router.delete('/:productId', deleteProductById);
router.delete('/del-products', deleteAllProducts);
router.get('/users/count', getUserCount);

module.exports = router;