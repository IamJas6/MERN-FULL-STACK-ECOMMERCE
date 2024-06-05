const Order = require('../models/order')
const {updateOrderstatusSchema} = require("../helper/validation")


const allOrders = async (req, res) => {
    try {
        const { limit=10, offset=1 } = req.query
        const skip = (offset - 1) * limit
        const orders = await Order.find().populate('user', 'name email').populate('products.product', 'name image').skip(skip).limit(limit).sort({ createdAt: -1 })
        const total = await Order.countDocuments() 

        return res.status(200).json({
            mssg: "All orders",
            data: { orders, pagiantion: { limit, offset, total }}
        })


    } catch (error) {
        console.log("Get all orders error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

const userOrders = async (req, res) => {
    try {
        const userId = req.user._id
        const { limit=10, offset=1 } = req.query
        const skip = (offset - 1) * limit
        const order = await Order.find({ user: userId }).populate('products.product').skip(skip).limit(limit).sort({ createdAt: -1 })
        const total = await Order.countDocuments() 

        return res.status(200).json({
            mssg: "All orders",
            data: { order, 
                pagination: { 
                    limit, 
                    offset, 
                    total 
                }
            }
        })
    } catch (error) {
        console.log("Get user orders error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

const getOrderById = async (req, res) => {
    try {
        const {orderId} = req.params

        const orderInfo = await Order.findById(orderId).populate('user', 'name email').populate('products.product', 'name image')
        return res.status(200).json({
            mssg: "Order Info",
            data: {orderInfo}
        })
    } catch (error) {
        console.log("Get order by id error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

const updateStaus = async (req, res) => {
    try {
        const {orderId} = req.params
        const orderInfo = await Order.findById(orderId)
        if(!orderInfo){
            return res.status(400).json({
                mssg: "Order Not Found"
            })
        }

        const {error} = updateOrderstatusSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                mssg: error.details[0].message
            })
        }
        const {status} = req.body

        await Order.findByIdAndUpdate(orderId, {status:status})

        return res.status(200).json({
            mssg: "Status Updated Successfully"
        })

    } catch (error) {
        console.log("Status Update Error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

module.exports = { allOrders, userOrders, getOrderById, updateStaus }