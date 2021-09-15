import http from "k6/http";
import { check, sleep } from "k6";

import { params } from "../config.js";
import { getRandomInt } from "../utils.js";
import { getPaginatedProduct } from "../product/get-product.js";
import { createPurschaseUrl, getPurchaseData } from "./index.js";

export let options = {
  vus: 10,
  iterations: 100,
};

export const createPurchase = (data) =>
  http.post(createPurschaseUrl, data, params);

export default function () {
  const paginatedProductResponse = getPaginatedProduct();
  check(paginatedProductResponse, { "status was 200": (r) => r.status == 200 });

  const ids = paginatedProductResponse.json().map((product) => product.id);
  const userId = getRandomInt(1, 100);

  const purchaseResponse = createPurchase(getPurchaseData(userId, ids));

  check(purchaseResponse, { "status was 200": (r) => r.status == 200 });

  sleep(0.01);
}
