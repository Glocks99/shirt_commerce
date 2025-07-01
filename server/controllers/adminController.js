const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const User = require("../models/User");
const Category = require("../models/Category");


// Users
const getAllUsers = async(req,res) => {
    try {
        const users = await User.find({}, '-password -verificationToken -resetPasswordToken -verificationTokenExpires -resetPasswordTokenExpires')
            .sort({ createdAt: -1 })

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
        
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserById = async(req, res) => {
    const {userId} = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const user = await User.findById(userId, '-password -verificationToken -resetPasswordToken');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
        
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteUserById = async(req,res) => {
    const {userId} = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateUserById = async(req, res) => {
    const {userId} = req.params;
    const {firstName, lastName, contact, email, isAdmin} = req.body;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const user = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
            contact,
            email,
            isAdmin
        }, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
        
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const addNewUser = async(req,res) => {
    const {firstName, lastName, contact, email, password, isAdmin} = req.body;

    if (!firstName || !lastName || !contact || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newUser = new User({
            firstName,
            lastName,
            contact,
            email,
            password,
            isAdmin
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });
        
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserCount = async(req, res) => {
    try {
        const userCount = await User.count({isAdmin: false});
        if (userCount === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({ count: userCount });
    } catch (error) {
        console.error("Error fetching user count:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


//Products
const createProduct = async (req, res) => {
  const {
    name,
    description,
    richDescription,
    brand,
    category,
    priceCents,
    isFeatured,
  } = req.body;

  try {
    const categoryExists = await Category.findOne({ name: category });
    if (!categoryExists) {
      return res.status(400).json({ message: "Category doesn't exist" });
    }

    const basePath = req.protocol + '://' + req.get('host') + '/uploads/products/';

    // Handle main image:
    let mainImagePath = "";
    if (req.files.image && req.files.image.length > 0) {
      mainImagePath = basePath + req.files.image[0].filename;
    } else {
      return res.status(400).json({ message: "Main product image is required" });
    }

    // Handle additional images:
    let imagesArray = [];
    if (req.files.images && req.files.images.length > 0) {
      imagesArray = req.files.images.map(file => basePath + file.filename);
    }

    const newProduct = new Product({
      name,
      description,
      richDescription: richDescription || '',
      image: mainImagePath, // main product image
      images: imagesArray, // multiple additional images
      brand: brand || 'N/B',
      category: categoryExists._id,
      priceCents,
      isFeatured: isFeatured === "true" || false, // form data sends boolean as string
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getProductsCount = async(req,res) => {
    try {
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({ count: productCount });
    } catch (error) {
        console.error("Error fetching product count:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateProductById = async(req,res) => {
    const {productId} = req.params;

    if(!mongoose.isValidObjectId(productId)){
        return res.status(500).json({message: "Invalid product Id"})
    }

    const { name, description, richDescription, image, brand, category, priceCents, isFeatured } = req.body;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    if (!name || !description || !richDescription || !image || !brand || !category || priceCents || isFeatured === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const category = await Category.findById(category)

        if(!category){
            return res.status(500).json({message: "Invalid category Id"})
        }

        const product = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            richDescription,
            image,
            brand,
            category,
            priceCents,
            isFeatured
        }, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("update by id error: " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

const deleteProductById = async(req,res) => {
    const {productId} = req.params;

    if(!productId){
        return res.json({message: "Product Id needed!"})
    }

    try {
        const product = await Product.findByIdAndDelete(productId)

        if(!product){
            return res.json({message: "cant find product"})
        }

        res.status(200).json({message: "product deleted!"})
    } catch (error) {
        console.log("delete product error: " + error)
        res.status(500).json({message: "Internal server error"})
    }
}

const deleteAllProducts = async(req,res) => {
    try {
        const products = await Product.deleteMany({});

        if(!products){
            return res.json({message: "cant find any products"})
        }

        return res.status(200).json({message: "All products deleted!"})
    } catch (error) {
        console.log("delete all products err: " +  error)
        return res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    addNewUser,
    getUserCount,
    createProduct,
    getProductsCount,
    updateProductById,
    deleteProductById,
    deleteAllProducts
};