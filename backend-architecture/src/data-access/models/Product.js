module.exports = function makeProductModel({ Mongoose, mainDBConnection }) {
  return async function getProductModel() {
    const dbConnection = await mainDBConnection(); // Call the function to get the resolved connection
    try {
      return dbConnection.model('Product');
    } catch (e) {
      const productSchema = new Mongoose.Schema({
        name: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        isActive: { type: Boolean, default: true }, // To soft-delete or deactivate the product
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      }, { collection: 'products' });
      return dbConnection.model('Product', productSchema);
    }
  };
};
