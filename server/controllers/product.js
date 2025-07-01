const Category = require("../models/Category.js");
const Product = require("../models/product.js");

const getAllProducts = async (req, res) => {
    let filter = {}
 if (req.query.categories) {
      const categoryNames = req.query.categories.split(',');
      
      // find matching categories in the Category collection
      const categories = await Category.find({ name: { $in: categoryNames } });
      const categoryIds = categories.map(cat => cat._id);

      filter = { category: { $in: categoryIds } };
    }
    try {
        const products = await Product.find(filter).populate('category')

        if(!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        return res.status(200).json(products);
        
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getProductById = async(req,res) => {
    const {productId} = req.params;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
        
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Internal Server Error" }); 
    }
}

const getAllFeatured = async(req,res) => {
    try {
        const products = await Product.find({isFeatured: true})

        if(!products){
            return res.json({message: "No featured product..."})
        }

        return res.send(products)
    } catch (error) {
        console.log(error.message)
        return res.json(error.message)
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getAllFeatured
};