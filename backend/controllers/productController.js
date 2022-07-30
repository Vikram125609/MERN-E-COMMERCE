const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// createProduct --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
});

// getAllProducts
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
});

// Get Product Detail
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }
    console.log(product);
    res.status(200).json({ success: true, product });

});

// Update Product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }
    product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true, useFindAndModify: false });
    res.status(200).json({ success: true, product });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }
    await product.remove();
    console.log(product);
    res.status(200).json({ success: true, message: "Product Deleted Successfully" });
});