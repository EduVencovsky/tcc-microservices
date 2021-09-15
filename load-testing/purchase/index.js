import { baseUrl } from "../config.js";
import { getRandomInt } from "../utils.js";

export const getPurchaseByIdUrl = (productId) => {
  return `${baseUrl}/purchase/${productId}`;
};

export const createPurschaseUrl = `${baseUrl}/purchase`;

export const getPurchaseData = (userId, productIds) => {
  return JSON.stringify({
    userId,
    productQuantity: productIds.map((productId) => ({
      productId,
      quantity: getRandomInt(1, 10),
    })),
  });
};
