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
  const take = getRandomInt(1, 10);
  let skip = 0;

  const productResponse1 = getPaginatedProduct(skip, take);
  check(productResponse1, {
    [`get product skip=${skip} take=${take} status was 200`]: (r) =>
      r.status === 200,
  });

  skip += take;

  const productResponse2 = getPaginatedProduct(skip, take);
  check(productResponse2, {
    [`get product skip=${skip} take=${take} status was 200`]: (r) =>
      r.status === 200,
  });

  skip += take;

  const productResponse3 = getPaginatedProduct(skip, take);
  check(productResponse3, {
    [`get product skip=${skip} take=${take} status was 200`]: (r) =>
      r.status === 200,
  });
}
