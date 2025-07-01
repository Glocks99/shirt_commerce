const Orders = require("../models/Orders");
const CartItem = require("../models/CartItem");
const { default: formatCurrency } = require("../util/Money");

const getAllorders = async(req, res) => {
    try {
        const orders = await Orders.find()
            .populate('orderItems')
            .populate('user', 'name email')
            .sort({ dateOrdered: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(orders);
        
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Orders.findById(id)
        .populate('user', 'name email')
        .populate({
            path: 'orderItems',
            populate: {
                path: 'product',
                populate: 'category'
            }
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
        
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: error.message });
    }
}

const createOrder = async(req,res) => {
    const { orderItems, shippingAddress1, shippingAddress2, phone, totalPrice,status,dateOrdered, userId } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: "cart is empty" });
    }

    const orderItemsIds = await Promise.all(orderItems.map(async (item) => {
        const newOrderItem = new CartItem({
            quantity: item.quantity,
            product: item.id
        });
        const savedOrderItem = await newOrderItem.save();
        return savedOrderItem._id;
    }));

    const totalPrices = await Promise.all(orderItemsIds.map(async (orderItemId) => {
        const orderItem = await CartItem.findById(orderItemId).populate('product', 'priceCents');
        const totalPrice = formatCurrency(orderItem.product.priceCents)  * orderItem.quantity;
        return totalPrice;
    }));

    const TotalPrice = totalPrices.reduce((a, b) => a + b, 0);

    try {
        const newOrder = new Orders({
            orderItems,
            shippingAddress1,
            shippingAddress2,
            phone,
            totalPrice: TotalPrice,
            user: userId ? userId : null, // Optional user ID
            status: 'Pending', // Default status,
            dateOrdered: new Date() // Set the current date as the order date
        });

        const savedOrder = await newOrder.save();

        if(!savedOrder) {
            return res.status(400).json({ message: "The order cannot be created!" });
        }

        res.status(201).json(savedOrder);
        
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: error.message });
    }
}

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Orders.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(400).json({ message: "The order cannot be updated!" });
        }

        res.status(200).json(updatedOrder);
        
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: error.message });
    }
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Orders.findByIdAndRemove(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found!" });
        }

        // Optionally, you can also delete associated order items if needed
        await CartItem.deleteMany({ _id: { $in: order.orderItems } });

        res.status(200).json({ success: true, message: "The order is deleted!" });
        
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: error.message });
    }
}

const getOrderCount = async (req, res) => {
    try {
        const orderCount = await Orders.countDocuments();

        if (orderCount === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json({ orderCount });
        
    } catch (error) {
        console.error("Error fetching order count:", error);
        res.status(500).json({ message: error.message });
    }
}

const getUserOrdersById = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Orders.find({ user: userId })
            .populate('orderItems')
            .populate('user', 'name email')
            .sort({ dateOrdered: -1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json(orders);
        
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllorders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderCount,
    getUserOrdersById
};