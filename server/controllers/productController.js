
const Product = require('../models/productModel');

exports.addProduct = async (req, res) => {
  try {
    const { productName, sellerName, price, image, documentId, wvmOption, wvmId, elementId } = req.body;

    const product = new Product({
      name: productName,
      seller: req.user._id,
      sellerName,
      price,
      documentId,
      wvmOption,
      wvmId,
      elementId,
      image
    });

    await product.save();

    res.status(201).json({ message: 'Product Added successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: error });
  }
};

exports.getPaginatedProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  try {
    let query = { isActive: true };

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .populate('seller')
      .exec();

    const totalProducts = await Product.countDocuments(query);

    res.json({
      products: products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    res.status(500).json({ message: error });
  }
};

exports.getDataGridProducts = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, sortField = 'name', sortOrder = 'asc', filter = '' } = req.query;
    const skip = (page - 1) * pageSize;

    let query = { softDelete: false };

    if (filter) {
      query.name = { $regex: filter, $options: 'i' };
    }
    if (req.user.role !== 'admin') {
      query.seller = req.user._id;
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    const products = await Product.find(query)
      .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(Number(pageSize));

    res.status(200).json({ message: "Success", products, totalPages, totalProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error });
  }
};


exports.toggleApproval = async (req, res) => {
  try {
    const { isApproved, _id } = req.body;

    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.isApproved = isApproved;
    await product.save();

    res.status(200).json({ message: `Product approval status updated to ${isApproved ? 'approved' : 'disapproved'}` });
  } catch (error) {
    console.error('Error toggling product approval status:', error);
    res.status(500).json({ message: error });
  }
};

exports.toggleActive = async (req, res) => {
  try {
    const { isActive, _id } = req.body;
    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = isActive;
    await product.save();

    return res.status(200).json({ message: `Product active status updated to ${isActive ? 'not Active' : 'Active'}` })
  } catch (error) {
    console.error('Error toggling product active status:', error);
    res.status(500).json({ message: error });
  }
}

exports.softDelete = async (req, res) => {
  try {
    const { _id } = req.body;

    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.softDelete = true
    await product.save();

    res.status(200).json({ message: "Soft delete status successfully", product });
  } catch (error) {
    console.error('Error soft delete status:', error);
    res.status(500).json({ message: error });
  }
};

// exports.deleteProduct = async (req, res) => {
//   try {
//     const { _id } = req.body;

//     const deletedProduct = await Product.findByIdAndDelete(_id);

//     if (!deletedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     res.status(200).json({ message: "Product deleted successfully", deletedProduct });
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).json({ message: error });
//   }
// };

exports.editProduct = async (req, res) => {
  const { _id, name, sellerName, price, image, documentId, wvmOption, wvmId, elementId } = req.body;

  try {
    const existingProduct = await Product.findById(_id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    existingProduct.name = name;
    existingProduct.sellerName = sellerName;
    existingProduct.price = price;
    existingProduct.image = image;
    existingProduct.documentId = documentId;
    existingProduct.wvmOption = wvmOption;
    existingProduct.wvmId = wvmId;
    existingProduct.elementId = elementId;

    await existingProduct.save();

    res.status(200).json({ message: 'Product updated successfully', product: existingProduct });
  } catch (error) {
    console.error('Error editing product:', error);
    res.status(500).json({ error: 'Product not found' });
  }
};

