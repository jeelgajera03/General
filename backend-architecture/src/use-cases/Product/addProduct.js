module.exports = function makeAddProduct({ productDb, ValidationError }) {
  return async function addProduct({ name, description, price, stock }) {
    console.log({name, description, price, stock})
    if (!name || !description || typeof price !== 'number' || typeof stock !== 'number') {
      throw new ValidationError(102, 'All fields are required');
    }

    const newProduct = await productDb.createProduct({
      name,
      description,
      price,
      stock,
    });

    return {
      id: newProduct._id,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      stock: newProduct.stock,
    };
  };
};
