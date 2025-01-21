const ProductModel = require('../models/productModel')

exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.getAllProducts()
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json('Internal Server Error')
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Deleted product"
        })
    } catch (error) {
        
    }
}