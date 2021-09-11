import { baseUrl } from "../config.js";

export const getProductByIdUrl = (productId) => {
  return `${baseUrl}/product/${productId}`;
};

export const getPaginatedProductUrl = (skip = 0, take = 10) => {
  return `${baseUrl}/product?take=${take}&skip=${skip}`;
};

export const createProductUrl = `${baseUrl}/product`;

export const getProductData = (productName = undefined) => {
  const name = productName ? productName : `product-${Math.random() * 10}`;

  return JSON.stringify({
    name,
  });
};
