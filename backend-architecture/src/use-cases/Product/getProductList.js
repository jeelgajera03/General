module.exports = function makeGetProductList({ productDb }) {
  return async function getProductList({ query }) {
    const { name, minPrice, maxPrice } = query;

    // Build filter query
    const filters = {};
    if (name) filters.name = new RegExp(name, 'i'); // Case-insensitive search
    if (minPrice) filters.price = { ...filters.price, $gte: Number(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, $lte: Number(maxPrice) };

    const products = await productDb.findProducts({ filters });
    return products.map(product => ({
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    }));
  };
};
