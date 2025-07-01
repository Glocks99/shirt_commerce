const Category = require("../models/Category")

const getAllCategories = async(req,res) => {
    try {
        const categories = await Category.find()

        if(!categories){
            res.status(500).json({message: "No categories found"})
        }

        return res.send(categories)
    } catch (error) {
        console.log(error.message)
        return res.json({message: "Internal server error"})
    }
}

const getCatById = async(req,res) => {
    const {catId} = req.params

    if(!catId){
        return res.json({message: "category Id not found"})
    }

    try {
        const cat = await Category.findById(catId)

        if(!cat){
            return res.json({message: "The category with the given ID was not found."})
        }

        return res.status(200).send(cat)
    } catch (error) {
        console.log(error.message)
        return res.json({message: "Internal server error"})
    }
}

const updateCategory = async(req,res) => {
    const {catId} = req.params;

    if(!catId){
        return res.json({message: "Category Id is needed"})
    }

    try {
        const cat = await Category.findByIdAndUpdate(catId, {
            name: req.body.name
        }, {new: true, runValidators: true})

        if(!cat){
            return res.json({message: "category cant be updated!"})
        }

        return res.json({message: "category updated"})
    } catch (error) {
        console.log(error.message)
        return res.json({message: "Internal server error"})
    }
}

const deleteCategory = async(req,res) => {
    const {catId} = req.params;

    if(!catId){
        return res.json({message: "category Id needed"})
    }

    try {
        const cat = await Category.findByIdAndDelete(catId)

        if(!cat){
            return res.json({message: "category cant be found"})
        }

        return res.json({message: "category deleted!"})
    } catch (error) {
        console.log(error.message)
        return res.json({message: "Internal server error"})
    }
}

const addCategory = async(req,res) => {
    const {name} = req.body;
    if(!name){
        return res.json({message: "Category name is required"})
    }

    try {
        const category = new Category({
            name
        })

        const savedCategory = await category.save()

        if(!savedCategory){
            return res.json({message: "category not saved"})
        }

        return res.status(201).json({message: "category created"})
        
    } catch (error) {
        console.log(error.message)
        return res.json({message: "Internal server error"})
        
    }
}

module.exports = {
    getAllCategories,
    getCatById,
    updateCategory,
    deleteCategory,
    addCategory
}    