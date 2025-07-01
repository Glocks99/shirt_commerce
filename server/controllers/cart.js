const CartItem = require("../models/CartItem");


const sync = async(req,res) => {
    const {userId, items} = req.body;

    if(!userId || !items){
        return res.json({message: "Not authenticated!"})
    }

    try {
        await CartItem.deleteMany({user: userId})

        const cartItems = items.map(item => ({
            user: userId,
            product: item.productId,
            quantity: item.quantity,
        }));

        await CartItem.insertMany(cartItems);

        res.status(200).json({ message: "Cart synced successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to sync cart" });
    }
}

const getCartById = async(req,res) => {
    const {userId} = req.body

    if(!userId){
        return res.json({message: "Not authenticated!"})
    }

    try {
        const cartItems = await CartItem.find({ user: userId }).populate('product');
        res.status(200).json(cartItems);    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to load cart" });
    }
}


module.exports = {sync, getCartById}