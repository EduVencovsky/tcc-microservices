import http from "k6/http";
import { check, sleep } from "k6";

import { getPaginatedProductUrl } from "./index.js";

export let options = {
  vus: 10,
  iterations: 100,
};

const getPaginatedProduct = () => http.get(getPaginatedProductUrl());

export default function () {
  const paginatedProductResponse = getPaginatedProduct();
  check(paginatedProductResponse, { "status was 200": (r) => r.status == 200 });
  sleep(0.01);
}
