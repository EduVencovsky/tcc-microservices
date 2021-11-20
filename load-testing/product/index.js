import { baseUrl } from "../config.js";
import { getRandomInt } from "../utils.js";

export const getPingProductUrl = () => {
  return `${baseUrl}/product/ping-product`;
};

export const getProductByIdUrl = (productId) => {
  return `${baseUrl}/product/${productId}`;
};

export const getPaginatedProductUrl = (skip = 0, take = 10) => {
  return `${baseUrl}/product?take=${take}&skip=${skip}`;
};

export const createProductUrl = `${baseUrl}/product`;

export const getProductData = (productName = undefined) => {
  const name = productName ? productName : `product-${getRandomInt(1, 1000)}`;

  return JSON.stringify({
    name,
  });
};
