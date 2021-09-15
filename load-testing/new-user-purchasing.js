import http from "k6/http";
import { check, sleep } from "k6";

import { getRandomInt } from "./utils.js";
import { createUser } from "./user/create-user.js";
import { getPaginatedProduct } from "./product/get-product.js";
import { createPurchase } from "./purchase/create-purchase.js";
import { getPurchaseData } from "./purchase/index.js";

export let options = {
  vus: 10,
  iterations: 100,
};

export default function () {
  const productResponse = getPaginatedProduct(0, getRandomInt(1, 10));
  check(productResponse, {
    "get product status was 200": (r) => r.status === 200,
  });

  const userResponse = createUser();
  check(userResponse, { "user status was 201": (r) => r.status === 201 });
  const userId = userResponse.json().id;

  const productIds = productResponse.json().map((p) => p.id);

  const purchaseResponse = createPurchase(getPurchaseData(userId, productIds));
  check(purchaseResponse, {
    "purchase status was 201": (r) => r.status == 201,
  });
  sleep(0.01);
}
