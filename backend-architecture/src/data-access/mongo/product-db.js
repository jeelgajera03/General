function makeProductDb({ getProductModel }) {
  return Object.freeze({
    createProduct,
    findProducts,
  });

  async function createProduct({ name, description, price, stock }) {
    const productModel = await getProductModel();
    const newProduct = new productModel({
      name,
      description,
      price,
      stock,
    });
    return await newProduct.save();
  }

  async function findProducts({ filters = {} }) {
    const productModel = await getProductModel();
    return await productModel.find(filters).lean();
  }
}

module.exports = makeProductDb;
