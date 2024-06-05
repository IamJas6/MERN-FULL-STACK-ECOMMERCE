const Cart = require('../models/cart')
const Product = require('../models/product')
const fs = require('fs')
const path = require('path')

//add to cart api
const addToCart = async (req, res) => {
    try {
        const userId = req.user._id  //get user id from req.user if user is logged in
        const { productId, quantity } = req.body

        const productinfo = await Product.findById(productId)  //get product id from database
        if(!productinfo){
            return res.status(400).json({
                mssg: "Product not found"
            })
        }

        const pricePerQuantity = productinfo.pricePerQuantity  //get price per quantity from database
        const price = quantity * pricePerQuantity  //calculate total price

        let cart = await Cart.findOne({ user: userId })  //get cart from database by user id
        if(!cart){                                       ///if cart not exist create new cart
            cart = new Cart({
                user : userId,
                products: [],
                totalAmount: 0
            })
        }

        const productExistIndex = cart.products.findIndex(item => item.product.equals(productId)) //check if product exist in cart if not returns -1
        if(productExistIndex > -1){
            cart.products[productExistIndex].quantity = quantity  //update quantity
            cart.products[productExistIndex].price = price          //update price
        } else {
            cart.products.push({ product: productId, quantity, price })
        }

        const totalAmount = cart.products.reduce((total, item) => total + item.price, 0) //calculate total amount
        cart.totalAmount = totalAmount

        const cartInfo = await cart.save()      //save cart to database

        return res.status(200).json({
            mssg: "Product added to cart",
            data: { cartInfo }
        })

    } catch (error) {
        console.log("add to cart error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

//get user cart api
const getUserCart = async (req, res) => {
    try {
        const userId = req.user._id
        const cart = await Cart.findOne({ user: userId }).populate('products.product')

        return res.status(200).json({
            mssg: "Cart fetched successfully",
            data: { cart }
        })

    } catch (error) {
        console.log("get user cart error", error)
        return res.status(500).json({
            mssg: "Fuck Internal server error, try again"
        })
    }
}

//remove cart api
const removeCart = async (req, res) => {
    try {
        const userId = req.user._id
        const { productId } = req.params
        const cartInfo = await Cart.findOne({ user: userId })
        if(!cartInfo){
            return res.status(400).json({
                mssg: "Cart not found"
            })
        }

        const price = cartInfo.products.find(item => item.product == productId).price

        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            {
                $pull: { products: { product: productId } },
                $inc: { totalAmount: -price }
            } ,
            { new: true }
        )

        return res.status(200).json({
            mssg: "Product removed from cart",
            data: { cart }
        })


    } catch (error) {
        console.log("remove cart error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

module.exports = {
    addToCart,
    getUserCart,
    removeCart
}